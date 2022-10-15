<template>
  <MoreInfoModal
    :new-class="'s-px-5 s-relative sm:s-px-7 s-pb-16  md-x:s-w-[647px] sm:s-w-[532px] s-min-w-[375px] s-w-full'"
    @cancel="closeForm"
  >
    <Loading v-if="false" :class="'s-absolute'" />
    <transition>
      <div v-if="data" class="s-min-w-fit">
        <div>
          <div
          class="s-flex s-justify-end s-sticky s-top-0 s-bg-white s-z-10 s-py-7"
        >
            <Button
              :text="'Cancel'"
              class="s-outline s-outline-primary-blue !s-text-primary-blue s-text-sm s-leading-[18px] s-font-bold s-px-10 s-mr-2 sm:s-mt-0 s-rounded-full sm:s-py-[15px] s-py-[8px]"
              @submit="closeForm"
            />
            <Button
              :text="'Update'"
              class="s-bg-primary-blue s-text-sm s-leading-[18px] s-text-white s-font-bold s-px-10 s-mr-2 s-rounded-full sm:s-py-[15px] s-py-[12px]"
              @submit="submitForm"
            />
          </div>
          <div class="s-mt-3">
            <h1
              class="s-text-[#121212] s-mb-1.5 sm:s-text-xl s-text-lg s-leading-6 s-font-bold"
            >
              Listing Information >
              <span class="s-text-[#2E48DA]">Location</span>
            </h1>
            <p class="s-text-sm s-font-normal s-text-[#242428] s-leading-5">
              Update information about your space here
            </p>
          </div>
        </div>
        <div class="s-mt-10 s-px-0.5">
          <div class="textfield-wrap s-mb-6 !s-mr-0">
            <label
              class="s-text-[#222228] s-text-sm s-font-semibold s-block s-mb-2"
              >Enter the address of this space</label
            >
            <input
              ref="autocomplete"
              v-model.trim="form.property_address"
              type="text"
              placeholder="Enter street address"
              class="s-pr-3 s-py-3.5 s-pl-[1.375rem] s-font-normal s-placeholder-[#8F8FB1] s-text-[#000] s-text-sm s-rounded-full s-border-none s-ring-1 s-ring-[#99A4E1] focus:s-bg-[#F1F3FF] focus:s-ring-primary-blue focus:s-ring-2 s-bg-[#FAFAFE] s-w-full focus:s-outline-none"
              :class="[
                {
                  's-ring-[#EA4335] focus:s-ring-[#EA4335] !s-pr-12':
                    error && error.property_address.$error,
                },
              ]"
            />
            <FormFieldError
              :validation-msg="validationMsg($v.form.property_address)"
            />
          </div>
          <div
            v-show="suggestions"
            class="s-flex s-justify-between s-flex-wrap s-pb-10 s-border-b s-border-solid s-border-[#b1b7d6]/20 s-mb-6"
          >
            <div
              id="map"
              class="sm:s-max-w-[20rem] s-h-[15.375rem] s-w-full sm:s-mb-0 s-mb-6"
            ></div>
            <div class="s-flex-1 sm:s-ml-7">
              <h4 class="s-text-sm s-font-bold">
                Click on the address that is yours or close to yours
              </h4>
              <ul>
                <li
                  v-for="(address, index) in addressList"
                  :key="index"
                  class="s-flex s-items-center s-cursor-pointer s-border-b s-border-[#b1b7d6]/[0.2] s-border-solid s-text-sm s-text-[#222228] s-font-normal s-pb-3 s-pt-5 last:s-border-0 hover:bg-gray-one/30"
                  @click="populate(index)"
                >
                  <img
                    src="~/assets/images/map-marker.svg"
                    alt="map pointer"
                    class="s-mr-2"
                  />
                  {{ address.formatted_address }}
                </li>
              </ul>
            </div>
          </div>

          <div class="s-flex s-justify-between s-flex-wrap">
            <div class="xs:s-w-6/12 s-w-full s-mb-6">
              <TextField
                :class="'!s-mr-0 md:s-mr-8 s-w-full !s-mb-0'"
                placeholder="e.g 42b"
                type="text"
                label="What’s your apartment number? (Optional)"
                name="apartment_number"
                :model-value="form.house_no"
                @update:modelValue="(value) => (form.house_no = value)"
              />
            </div>
            <div class="xs:s-w-5/12 s-w-full s-mb-6">
              <TextField
                :class="'!s-mr-0 md:s-mr-8 s-w-full !s-mb-0'"
                placeholder="e.g Example Unit"
                type="text"
                label="Give your entire unit a name"
                name="space_name"
                :error="error && error.title"
                :validation-msg="validationMsg(error !== null && error.title)"
                :model-value="form.title"
                @update:modelValue="(value) => (form.title = value)"
              />
            </div>
          </div>
          <div class="textfield-wrap s-mb-6 !s-mr-0">
            <div class="s-flex s-justify-between s-mb-2 items-center">
              <label class="s-text-[#222228] s-text-sm s-font-semibold s-block"
                >Describe your entire unit</label
              >
              <button
                class="s-text-sm s-font-semibold s-text-primary-blue s-border-b s-border-solid s-border-primary-blue"
                @click="toggleDescriptionTip"
              >
                Description Tips
              </button>
            </div>

            <BaseTextArea
              :class="'!s-mr-0 s-w-full'"
              placeholder="Enter a short description of your unit here"
              type="text"
              name="description"
              :error="error && error.description"
              :validation-msg="
                validationMsg(error !== null && error.description)
              "
              :model-value="form.description"
              @update:modelValue="(value) => (form.description = value)"
            />
          </div>
        </div>
      </div>
    </transition>
  </MoreInfoModal>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'
import { required } from 'vuelidate/lib/validators'
import { validationMessage } from 'vuelidate-messages'
import * as locationService from '~/helpers/utils/location'

const formMessages = {
  descriptionRequired: () => 'Apartment description is required.',
  property_addressRequired: () => 'Address is required',
  titleRequired: () => 'Space name is required',
}
let Gmap
let Gmarker
export default {
  data() {
    return {
      geolocationSupported: `geolocation` in navigator,
      addressList: null,
      coordinatesL: '',
      suggestions: false,
      error: null,
      loading: false,
      editMode: false,
      showDescriptionTip: false,
      form: {
        description: '',
        property_address: '',
        city: '',
        country: '',
        house_no: '',
        latitude: '',
        longitude: '',
        title: '',
      },
      data: null
    }
  },
  validations: {
    form: {
      description: {
        descriptionRequired: required,
      },
      property_address: {
        property_addressRequired: required,
      },
      title: {
        titleRequired: required,
      },
    },
  },
  computed: {
    ...mapState('host/listing', [
      'propertyListingId',
      'loader',
      'currentLevel',
      'step',
    ]),
  },
  mounted() {
    this.getSavedLocation()
    this.displayLocation()
    this.autocomplete = new window.google.maps.places.Autocomplete(
      this.$refs.autocomplete,
      {
        types: [],
        componentRestrictions: { country: ['ng', 'gh'] },
        fields: [
          'address_components',
          'formatted_address',
          'name',
          'place_id',
          'geometry',
        ],
      }
    )
    this.autocomplete.addListener('place_changed', () => {
      const place = this.autocomplete.getPlace()
      place.address_components.map((component) => {
        const types = component.types

        if (
          types.includes('locality') ||
          types.includes('administrative_area_level_1')
        ) {
          this.form.city = component.long_name
        }
        if (types.includes('country')) {
          this.form.country = component.long_name
        }

        return []
      })
      this.form.latitude = place.geometry.location.lat().toString()
      this.form.longitude = place.geometry.location.lng().toString()
      this.form.property_address = place.formatted_address
      const lat = Number(this.form.latitude)
      const lng = Number(this.form.longitude)
      const latlng = {
        lat,
        lng,
      }
      this.showMap(latlng)
      this.createMarker(latlng)
      this.suggestions = true
    })
  },
  methods: {
    closeForm() {
      this.$emit('cancel')
    },
    toggleDescriptionTip() {
      this.showDescriptionTip = !this.showDescriptionTip
    },
    ...mapMutations('host/listing', ['UPDATE_LEVEL', 'TOGGLE_LOADING']),
    ...mapActions('host/listing', [
      'getListingDetail',
      'updateBackendMove',
      'addLocation',
      'updateLocation',
    ]),
    scrolltoTop() {
      window.scrollTo(0, 0)
    },
    validationMsg: validationMessage(formMessages),
    showMap(latlng) {
      const mapOptions = {
        center: latlng,
        zoom: 14,
      }
      const mapDom = document.getElementById('map')
      Gmap = new window.google.maps.Map(mapDom, mapOptions)
      // listen for when the map is been dragged
      Gmap.addListener('drag', function () {
        Gmarker.setPosition(this.getCenter()) // set marker position to map center
        this.suggestions = true
      })

      // listen for when the map stop been dragged
      Gmap.addListener('dragend', function () {
        Gmarker.setPosition(this.getCenter()) // set marker position to map center
      })

      // listen for idleness on map
      const self = this
      Gmap.addListener('idle', function () {
        Gmarker.setPosition(this.getCenter()) // set marker position to map center
        this.suggestions = true
        setTimeout(() => {
          const latitude = Gmarker.getPosition().lat()
          const longitude = Gmarker.getPosition().lng()
          const newCoord = {
            latitude,
            longitude,
          }
          self.getLocation(newCoord)
        }, 800)
      })
    },

    async getLocation(cordinate) {
      const addresses = await locationService.addressByCoordinates(cordinate)
      addresses.length = 5
      this.addressList = addresses
    },
    createMarker(latlng) {
      const markerOptions = {
        position: latlng,
        map: Gmap,
        animation: window.google.maps.Animation.BOUNCE,
        clickable: true,
        draggable: false,
        icon: 'https://res.cloudinary.com/spleetng/image/upload/v1656578150/map-pointer.svg',
      }
      Gmarker = new window.google.maps.Marker(markerOptions)
    },

    async displayLocation() {
      this.coordinatesL = await locationService.currentCoordinates()
      const lat = this.coordinatesL.latitude
      const lng = this.coordinatesL.longitude
      const latlng = {
        lat,
        lng,
      }
      this.showMap(latlng)
      this.createMarker(latlng)
    },
    populate(id) {
      // reset form before filling
      this.suggestions = false

      // filling form
      const populateAdd = this.addressList[id]
      this.form.property_address = populateAdd.formatted_address
      this.form.longitude = populateAdd.geometry.location.lng.toString()
      this.form.latitude = populateAdd.geometry.location.lat.toString()
      this.placeID = populateAdd.place_id
      populateAdd.address_components.map((component) => {
        const types = component.types

        if (types.includes('locality')) {
          this.form.city = component.long_name
        }
        if (types.includes('country')) {
          this.form.country = component.long_name
        }
        return []
      })
    },
    async updateLevl() {
      const response = await this.updateBackendMove()
      return response
    },
    async submitForm() {
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.error = this.$v.form
        this.scrolltoTop()
      } else {
        this.loading = true
        this.error = null
        this.form.property_listing_id = this.propertyListingId
       
          try {
            const response = await this.updateLocation(this.form)
            this.loading = false
            if (response.data.statusCode === 200) {
              this.closeForm()
            }
          } catch (error) {
            this.loading = false
            this.$errorHandler(error)
          }

        this.scrolltoTop()
      }
    },
    async getSavedLocation() {
      try {
        const response = await this.getListingDetail()
        this.data = response?.data.data
        if (
          response.data.statusCode === 200 &&
          Object.keys(response?.data?.data).length > 0
        ) {
          
          this.form.title = response?.data?.data?.title
          this.form.city = response?.data?.data?.city
          this.form.country = response?.data?.data?.country
          this.form.description = response?.data?.data?.description
          this.form.house_no = response?.data?.data?.house_no
          this.form.property_address = response?.data?.data?.property_address
          this.form.longitude = response?.data?.data?.longitude
          this.form.latitude = response?.data?.data?.latitude
          const lat = Number(response?.data?.data?.latitude)
          const lng = Number(response?.data?.data?.longitude)
          const latlng = {
            lat,
            lng,
          }
          this.showMap(latlng, lat, lng)
          this.createMarker(latlng)
        }
      } catch (error) {
        this.$errorHandler(error)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.v-enter-active,
.v-leave-active {
  transition: all 1s ease;
}

.v-enter,
.v-leave-to {
  opacity: 0;
  transform: translateX(100px);
}
