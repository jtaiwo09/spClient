<template>
  <MoreInfoModal
    :new-class="'s-px-5 s-relative sm:s-px-7 s-pb-16  md-x:s-w-[647px] sm:s-w-[532px] s-min-w-[375px] s-w-full'"
    @cancel="closeForm"
  >
    <Loading v-if="loader" :class="'s-absolute'" />
    <transition>
      <div v-if="allRooms.length" class="s-min-w-fit">
        <div
          class="s-flex s-justify-end s-sticky s-top-0 s-bg-white s-z-10 s-py-7"
        >
          <Button
            :text="'Cancel'"
            class="s-outline s-outline-primary-blue !s-text-primary-blue s-text-sm s-leading-[18px] s-font-bold s-px-10 s-mr-2 sm:s-mt-0 s-rounded-full sm:s-py-[15px] s-py-[8px]"
            @submit="closeForm"
          />
          <Button
            :loading="loading"
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
            <span class="s-text-[#2E48DA]">Rooms</span>
          </h1>
          <p class="s-text-sm s-font-normal s-text-[#242428] s-leading-5">
            Update information about your space here
          </p>
        </div>
        <div class="s-mt-10 s-px-0.5">
          <div
            class="s-w-full s-h-[13.125rem] s-rounded-2xl s-overflow-hidden s-mb-[2.375rem] s-hidden md-s:s-block"
          >
            <img
              src="https://res.cloudinary.com/spleetng/image/upload/v1654611906/frontend-images/space-details-2.jpg"
              alt=""
              class="s-w-full s-h-full s-object-cover"
            />
          </div>
          <div v-for="(room, i) in bedrooms" :key="i" class="relative">
            <BedroomTab
              :room="room"
              @delete="deleteRoom"
              @toggleForm="toggleForm"
            />
          </div>
          <div v-if="!hideForm">
            <div class="s-mb-[2.125rem] s-flex s-flex-col sm:s-flex-row">
              <div
                class="textfield-wrap s-mb-[1.375rem] sm:s-mb-0 sm:s-mr-5 md-x:!s-mr-[3.25rem] s-flex-1"
              >
                <label
                  class="s-text-[#222228] s-text-sm s-font-semibold s-block s-mb-3"
                  >Name this bedroom</label
                >
                <TextField
                  :class="'!s-mr-0 md:s-mr-8 s-w-full !s-mb-0'"
                  placeholder="Bedroom One"
                  type="text"
                  name="bedroomName"
                  :error="error && error.bedroomName"
                  :validation-msg="
                    validationMsg(error !== null && error.bedroomName)
                  "
                  :model-value="formData.bedroomName"
                  @update:modelValue="(value) => (formData.bedroomName = value)"
                />
              </div>
              <div class="s-flex-1">
                <label
                  class="s-text-[#222228] s-text-sm s-font-semibold s-block s-mb-3"
                  >Is this a master bedroom?</label
                >
                <div class="s-flex">
                  <SelectButton
                    name="Yes"
                    :value="formData.masterBedroom"
                    text="Yes"
                    :error="error && error.masterBedroom"
                    @submit="formData.masterBedroom = 'Yes'"
                  />
                  <SelectButton
                    name="No"
                    :value="formData.masterBedroom"
                    text="No"
                    :error="error && error.masterBedroom"
                    @submit="formData.masterBedroom = 'No'"
                  />
                </div>
                <FormFieldError
                  :validation-msg="
                    validationMsg(error !== null && error.masterBedroom)
                  "
                />
              </div>
            </div>
            <div
              class="s-mb-[2.125rem] s-w-full s-border-b s-border-solid sm:s-pb-4 s-border-[#b1b7d630]"
            >
              <div class="s-mb-[1.375rem] sm:s-mb-0 s-flex-1 sm:s-w-[47%]">
                <label
                  class="s-text-[#222228] s-text-sm s-font-semibold s-block s-mb-3"
                  >What furnishings are in the bedroom?</label
                >
                <MultipleSelect
                  :selected-value="formData.bedroomFurnishings"
                  :options="amenities"
                  :error="error && error.bedroomFurnishings"
                  :validation-msg="
                    validationMsg(error !== null && error.bedroomFurnishings)
                  "
                  @update="(value) => (formData.bedroomFurnishings = value)"
                />
              </div>
            </div>
            <div class="s-mb-[2.125rem]">
              <div class="s-flex s-flex-col sm:s-flex-row">
                <div
                  class="textfield-wrap s-mb-[1.375rem] sm:s-mb-0 sm:s-mr-5 md-x:!s-mr-[3.25rem] s-flex-1"
                >
                  <label
                    class="s-text-[#222228] s-text-sm s-font-semibold s-block s-mb-3"
                    >What type of bathroom do you have?</label
                  >
                  <div class="s-flex">
                    <SelectButton
                      name="ensuite"
                      :value="formData.bathroomType"
                      text="Ensuite"
                      :error="error && error.bathroomType"
                      @submit="formData.bathroomType = 'ensuite'"
                    />
                    <SelectButton
                      name="shared"
                      :value="formData.bathroomType"
                      text="Shared"
                      :error="error && error.bathroomType"
                      @submit="formData.bathroomType = 'shared'"
                    />
                  </div>
                  <FormFieldError
                    :validation-msg="
                      validationMsg(error !== null && error.bathroomType)
                    "
                  />
                </div>
                <div class="s-flex-1">
                  <label
                    class="s-text-[#222228] s-text-sm s-font-semibold s-block s-mb-3"
                    >What furnishings are in the bathroom?</label
                  >
                  <MultipleSelect
                    :selected-value="formData.bathroomFurnishings"
                    :options="bathroomAmenities"
                    :error="error && error.bathroomFurnishings"
                    :validation-msg="
                      validationMsg(error !== null && error.bathroomFurnishings)
                    "
                    @update="(value) => (formData.bathroomFurnishings = value)"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="s-flex s-justify-end">
            <Button
              text="+ Add Bedroom"
              class="s-border-none s-ring-2 s-ring-primary-blue !s-text-primary-blue s-px-4 s-w-fit"
              :loading="addRoomLoader"
              @submit="addBedroom"
            />
          </div>
        </div>
      </div>
    </transition>
  </MoreInfoModal>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import { required } from 'vuelidate/lib/validators'
import { validationMessage } from 'vuelidate-messages'

const formMessages = {
  bedroomNameRequired: () => 'Bedroom name is required',
  masterBedroomRequired: () => 'Master bedroom is required',
  bedroomFurnishingsRequired: () => 'kindly select bedroom furnishings',
  bathroomFurnishingsRequired: () => 'Kindly select bathroom furnishings',
  bathroomTypeRequired: () => 'Kindly select bathroom type',
}
export default {
  data() {
    return {
      bedrooms: [],
      allRooms: [],
      formData: {
        bedroomName: '',
        masterBedroom: '',
        bedroomFurnishings: [],
        bathroomFurnishings: [],
        bathroomType: '',
        id: '',
      },
      roomAmenitiesOptions: null,
      bathroomAmenitiesOptions: null,
      amenities: null,
      bathroomAmenities: null,
      loading: false,
      addRoomLoader: false,
      error: null,
      doubleMasterbedError: null,
      hideForm: false,
    }
  },
  validations: {
    formData: {
      bedroomName: {
        bedroomNameRequired: required,
      },
      masterBedroom: {
        masterBedroomRequired: required,
      },
      bedroomFurnishings: {
        bedroomFurnishingsRequired: required,
      },
      bathroomFurnishings: {
        bathroomFurnishingsRequired: required,
      },
      bathroomType: {
        bathroomTypeRequired: required,
      },
    },
  },
  computed: {
    ...mapState('host/listing', [
      'propertySetUp',
      'propertyListingId',
      'loader',
      'currentLevel',
      'step',
    ]),
    allAmenities() {
      const allBedroomAmenitieID = this.formData.bedroomFurnishings.map(
        (allIDs) => {
          return allIDs.id
        }
      )
      const newBedroomAmenitie = {
        amenity_cat_id: this.roomAmenitiesOptions.id,
        amenity_id: allBedroomAmenitieID,
      }
      const allBathroomAmenitieID = this.formData.bathroomFurnishings.map(
        (allIDs) => {
          return allIDs.id
        }
      )
      const newBathroomAmenitie = {
        amenity_cat_id: this.bathroomAmenitiesOptions.id,
        amenity_id: allBathroomAmenitieID,
      }
      const allAmenities = [newBedroomAmenitie, newBathroomAmenitie]
      return allAmenities
    },
  },
  watch: {
    propertySetUp: 'assignSetups',
    propertyListingId: 'getRooms',
    'formData.masterBedroom': 'checkOneMasterBed',
    allRooms: 'assignRooms',
  },
  mounted() {
    if (this.propertyListingId) {
      this.getRooms()
    }
    if (this.propertySetUp !== null) {
      this.assignSetups()
    }
  },
  methods: {
    closeForm() {
      this.$emit('cancel')
    },
    toggleForm(value) {
      this.hideForm = value
    },
    ...mapMutations('host/listing', ['TOGGLE_LOADING', 'UPDATE_ROOMS']),
    ...mapActions('host/listing', [
      'addRoomDetails',
      'addRoom',
      'getListingDetail',
      'updateBackendMove',
      'deleteBedroom',
    ]),
    validationMsg: validationMessage(formMessages),
    scrolltoTop() {
      window.scrollTo(0, 0)
    },
    assignRooms() {
      this.bedrooms = this.allRooms?.map((room) => ({
        bedroomName: room.name,
        masterBed: room.is_master,
        bedroomFurnishings: room.amenities
          .map((roomAmenities, filtered) => {
            if (roomAmenities.amenity_category.name === 'Bedroom') {
              filtered = {
                name: roomAmenities.amenity_name.name,
                id: roomAmenities.amenity_name.id,
              }
              return filtered
            } else return undefined
          })
          .filter((notUndefined) => notUndefined !== undefined),
        bathroomType: room.bathroom_type,
        bathroomFurnishings: room.amenities
          .map((bathroomAmenities, filtered) => {
            if (bathroomAmenities.amenity_category.name === 'Bath Room') {
              filtered = {
                name: bathroomAmenities.amenity_name.name,
                id: bathroomAmenities.amenity_name.id,
              }
              return filtered
            } else return undefined
          })
          .filter((notUndefined) => notUndefined !== undefined),
        id: room.id,
      }))
    },
    resetForm() {
      this.formData.bedroomFurnishings = []
      this.formData.bathroomFurnishings = []
      this.formData.bedroomName = ''
      this.formData.masterBedroom = ''
      this.formData.bathroomType = ''
      this.error = null
      this.doubleMasterbedError = null
    },
    checkOneMasterBed() {
      if (this.bedrooms.length > 0 && this.formData.id === '') {
        if (this.formData.masterBedroom === 'Yes') {
          const v = this.bedrooms.some((el) => el.masterBed === 'Yes')
          if (v) {
            this.doubleMasterbedError =
              'Sorry, you can only have one master bedroom per listing.'
            this.formData.masterBedroom = 'No'
            this.$showToast(this.doubleMasterbedError, 'error')
          }
        }
      } else if (this.bedrooms.length > 0 && this.formData.id !== '') {
        const v = this.bedrooms.some((el) => el.id === this.formData.id)
        if (v) {
          this.doubleMasterbedError = null
        }
      }
    },
    async getRooms() {
      try {
        const response = await this.getListingDetail()
        if (response.data.statusCode === 200) {
          this.allRooms = response.data.data
          this.UPDATE_ROOMS(this.allRooms)
        }
      } catch (error) {
        this.$errorHandler(error)
      }
    },
    async addBedroom() {
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.error = this.$v.formData
        this.scrolltoTop()
      } else {
        this.error = null
        this.addRoomLoader = true
        const data = {
          property_listing_id: this.propertyListingId,
          name: this.formData.bedroomName,
          is_master: this.formData.masterBedroom,
          bathroom_type: this.formData.bathroomType,
          amenities: this.allAmenities,
        }
        try {
          const response = await this.addRoom(data)
          this.addRoomLoader = false
          if (response.data.statusCode === 201) {
            this.resetForm()
            this.getRooms()
          }
        } catch (error) {
          this.addRoomLoader = false
          this.$errorHandler(error)
        }
      }
    },
    async submitForm() {
      this.$v.$touch()
      if (this.$v.$invalid && !this.bedrooms.length) {
        this.error = this.$v.formData
      } else {
        this.loading = true
        try {
          const response = await this.updateBackendMove()
          this.loading = false
          if (response.data.statusCode === 200) {
            this.addBedroom()
            this.$emit('cancel')
          }
        } catch (error) {
          this.loading = false
          this.$errorHandler(error)
        }
      }
    },
    async deleteRoom(roomId) {
      try {
        const response = await this.deleteBedroom(roomId)
        if (response.data.statusCode === 200) {
          this.getRooms()
        }
      } catch (error) {
        this.$errorHandler(error)
      }
    },
    assignSetups() {
      this.propertySetUp.amenity_categories.filter((roomAmenities) => {
        if (roomAmenities.name === 'Bedroom') {
          this.roomAmenitiesOptions = roomAmenities
          this.amenities = this.roomAmenitiesOptions.amenities.map(
            (newAmenities) => ({
              name: newAmenities.amenity_meta.name,
              id: newAmenities.amenity_id,
            })
          )
          this.moveNoneTop(this.amenities)
        }
        return undefined
      })
      this.propertySetUp.amenity_categories.filter((bathroomAmenities) => {
        if (bathroomAmenities.name === 'Bath Room') {
          this.bathroomAmenitiesOptions = bathroomAmenities
          this.bathroomAmenities = this.bathroomAmenitiesOptions.amenities.map(
            (newAmenities) => ({
              name: newAmenities.amenity_meta.name,
              id: newAmenities.amenity_id,
            })
          )
          this.moveNoneTop(this.bathroomAmenities)
        }
        return undefined
      })
    },
    moveNoneTop(data) {
      return data.unshift(
        ...data.splice(
          data.findIndex((v) => v.name === 'None'),
          1
        )
      )
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
</style>
