<template>
  <div>
    <Loading v-if="loader" />
    <div v-else class="r-wrap md-s:!s-min-h-fit">
      <div
        class="s-mb-2 s-px-6 md-x:!s-px-[3.25rem] s-flex s-justify-between s-items-center s-sticky s-top-0 md-s:s-top-2.5 s-h-[100px] s-w-full s-bg-[#fff] s-z-20"
      >
        <div>
          <h2 class="title s-text-[1.25rem] s-mb-0">Space Details</h2>
          <p class="sub-title !s-leading-[1.375rem] s-text-xs">
            Basic Information
          </p>
        </div>
        <div class="md-s:s-flex s-hidden">
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
      <div class="s-flex md-s:s-block s-flex-col s-pb-10">
        <div class="s-px-6 md-x:!s-px-[3.25rem]">
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
          <div class="s-hidden md:s-flex s-justify-end">
            <Button
              text="+ Add Bedroom"
              class="s-border-none s-ring-2 s-ring-primary-blue !s-text-primary-blue s-px-4 s-w-fit"
              :loading="addRoomLoader"
              @submit="addBedroom"
            />
          </div>
        </div>
        <div
          class="border s-mt-auto s-flex s-justify-between md-s:s-hidden s-py-5 s-border-t s-border-solid s-fixed s-bottom-0 s-w-full s-px-4 s-left-0 s-bg-white"
        >
          <button
            class="s-justify-items-start s-text-primary-blue"
            @click="back"
          >
            Back
          </button>
          <div class="s-flex s-gap-x-4">
            <Button
              v-if="!hideForm"
              text="+ Add Bedroom"
              class="s-border-none s-ring-2 s-ring-primary-blue !s-text-primary-blue s-px-4 s-w-fit"
              :loading="addRoomLoader"
              @submit="addBedroom"
            />
            <Button
              :class="'s-w-[7.875rem] s-bg-primary-blue s-py-2.5 s-font-bold s-text-[#fff]'"
              text="Next"
              :loading="loading"
              @submit="next"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
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
    toggleForm(value) {
      this.hideForm = value
    },
    ...mapMutations('host/listing', [
      'UPDATE_LEVEL',
      'TOGGLE_LOADING',
      'UPDATE_ROOMS',
    ]),
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
        this.TOGGLE_LOADING(true)
        const response = await this.getListingDetail()
        this.TOGGLE_LOADING(false)
        if (response.data.statusCode === 200) {
          this.allRooms = response.data.data
          this.UPDATE_ROOMS(this.allRooms)
        }
      } catch (error) {
        this.TOGGLE_LOADING(false)
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
    back() {
      this.$router.push({
        name: 'host-listing-space-details',
        query: { step: 1, level: 1 },
      })
      this.UPDATE_LEVEL(1)
    },
    updateMove() {
      this.$router.push({
        name: 'host-listing-space-details',
        query: { step: 1, level: 3 },
      })
      this.UPDATE_LEVEL(3)
    },
    async next() {
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
            this.updateMove()
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
