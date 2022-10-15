<template>
  <div>
    <Loading v-show="loader" />
    <div v-show="!loader" class="r-wrap s-pb-[2.375rem]">
      <div class="s-px-6 md-x:!s-px-[3.25rem] md-s:s-pb-0 s-pb-24">
        <div
          class="s-mb-[2.375rem] s-flex s-justify-between s-items-center s-sticky s-top-2.5 s-h-[100px] s-z-20 s-w-full s-bg-[#fff]"
        >
          <div class="">
            <h2 class="title s-text-[1.25rem] s-mb-0">Space Details</h2>
            <p class="sub-title !s-leading-[1.375rem] s-text-xs">Location</p>
          </div>
          <div class="sm:s-flex s-hidden">
            <Button
              :class="'s-mr-1.5 s-w-[7.875rem] s-border-2 s-border-solid s-border-primary-blue s-py-2.5 s-font-bold'"
              text="Back"
              text-class="s-text-primary-blue"
              @submit="back"
            />
            <Button
              :class="'s-w-[7.875rem] s-bg-primary-blue  s-py-2.5 s-font-bold'"
              text="Next"
              :loading="loading"
              @submit="next"
            />
          </div>
        </div>
        <div>
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
            v-if="suggestions"
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
              <ul v-if="addressList.length > 0">
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
        <div
          class="border s-mt-auto s-flex s-justify-end md-s:s-hidden s-py-5 s-border-t s-border-solid sm:s-border-0 s-fixed s-bottom-0 s-w-full s-pr-4 s-left-0 s-bg-white"
        >
          <Button
            :class="'s-mr-1.5 s-w-[7.875rem] s-border-2 s-border-solid s-border-primary-blue s-text-primary-blue s-py-2.5 s-font-bold'"
            text="Back"
            text-class="s-text-primary-blue"
            @submit="back"
          />
          <Button
            :class="'s-w-[7.875rem] s-bg-primary-blue s-py-2.5 s-font-bold s-text-[#fff]'"
            text="Next"
            :loading="loading"
            @submit="next"
          />
        </div>
      </div>
      <Modal :show="showDescriptionTip" @close="showDescriptionTip = false">
        <h3 class="s-text-xl s-text-[#0E0C0C] s-font-bold s-mb-14">
          Describing your space
        </h3>
        <p class="s-text-xs s-leading-5 s-text-primary s-font-bold">Example</p>
        <p class="s-text-xs s-leading-5 s-text-primary">
          An attached bedroom available in a well-furnished 3-bedroom co-shared
          apartment, fitted to the highest specifications for those who like it
          minimalistic and simple. Comes with a pool, outdoor bar, neighbourhood
          supermarket, 24 hrs power supply and weekly cleaning services amongst
          other standard amenities. Located in a serene gated community, with
          quick access to Lekki-Epe Expressway.
        </p>
      </Modal>
    </div>
  </div>
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
      addressList: [],
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
      this.form.property_address = place?.formatted_address
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
    toggleDescriptionTip() {
      this.showDescriptionTip = !this.showDescriptionTip
    },
    ...mapMutations('host/listing', [
      'UPDATE_LEVEL',
      'UPDATE_STEP',
      'TOGGLE_LOADING',
    ]),
    ...mapActions('host/listing', [
      'getListingDetail',
      'updateBackendMove',
      'addLocation',
      'updateLocation',
    ]),
    scrolltoTop() {
      window.scrollTo(0, 0)
    },
    back() {
      this.$router.push({
        name: 'host-listing-space-details',
        query: { step: 1, level: 4 },
      })
      this.UPDATE_LEVEL(4)
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
      this.form.property_address = populateAdd?.formatted_address
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
    async updateLevel() {
      const response = await this.updateBackendMove()
      return response
    },
    async next() {
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.error = this.$v.form
        this.scrolltoTop()
      } else {
        this.loading = true
        this.error = null
        this.form.property_listing_id = this.propertyListingId
        if (this.editMode) {
          try {
            const response = await this.updateLocation(this.form)
            this.loading = false
            if (response.data.statusCode === 200) {
              this.$router.push(
                `/host/listing/continue-listing?id=${this.propertyListingId}`
              )
            }
          } catch (error) {
            this.loading = false
            this.$errorHandler(error)
          }
        } else {
          try {
            const response = await this.addLocation(this.form)
            this.loading = false
            if (response.data.statusCode === 201) {
              this.UPDATE_STEP(2)
              this.UPDATE_LEVEL(1)
              this.updateLevel()
              this.$router.push(
                `/host/listing/continue-listing?id=${this.propertyListingId}`
              )
            }
          } catch (error) {
            this.loading = false
            this.$errorHandler(error)
          }
        }

        this.scrolltoTop()
      }
    },
    async getSavedLocation() {
      this.TOGGLE_LOADING(true)
      try {
        const response = await this.getListingDetail()
        this.TOGGLE_LOADING(false)
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
          this.editMode = true
        } else {
          this.editMode = false
        }
      } catch (error) {
        this.TOGGLE_LOADING(false)
        console.log(error)
        // this.$errorHandler(error)
      }
    },
  },
}
</script>
