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
            Living room, dining and kitchen information
          </p>
        </div>
        <div class="s-hidden md-s:s-flex">
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
      <div class="s-flex md-s:s-block s-flex-col md-s:s-pb-0">
        <div class="s-px-6 md-x:!s-px-[3.25rem]">
          <div
            class="s-w-full s-h-[13.125rem] s-rounded-2xl s-overflow-hidden s-mb-[2.375rem] s-hidden sm:s-block"
          >
            <img
              src="https://res.cloudinary.com/spleetng/image/upload/v1654611906/frontend-images/space-details-2.jpg"
              alt=""
              class="s-w-full s-h-full s-object-cover"
            />
          </div>
          <div>
            <div class="s-mb-[2.125rem]">
              <div class="s-flex s-flex-col sm:s-flex-row">
                <div
                  class="textfield-wrap s-mb-[1.375rem] sm:s-mb-0 sm:s-mr-5 md-x:!s-mr-[3.25rem] s-flex-1"
                >
                  <label
                    class="s-text-[#222228] s-text-sm s-font-semibold s-block s-mb-3"
                    >What furnishings are in the living room?</label
                  >
                  <MultipleSelect
                    :options="livingRoomOptions"
                    :error="error && error.livingRoomFurnishings"
                    :validation-msg="
                      validationMsg($v.form.livingRoomFurnishings)
                    "
                    :selected-value="form.livingRoomFurnishings"
                    @update="(value) => (form.livingRoomFurnishings = value)"
                  />
                </div>
                <div class="s-flex-1">
                  <label
                    class="s-text-[#222228] s-text-sm s-font-semibold s-block s-mb-3"
                    >What furnishings are in the dining room?</label
                  >
                  <MultipleSelect
                    :options="diningRoomOptions"
                    :error="error && error.diningRoomFurnishings"
                    :validation-msg="
                      validationMsg($v.form.diningRoomFurnishings)
                    "
                    :selected-value="form.diningRoomFurnishings"
                    @update="(value) => (form.diningRoomFurnishings = value)"
                  />
                </div>
              </div>
            </div>
            <div class="s-mb-[2.125rem]">
              <div class="s-flex s-flex-col sm:s-flex-row">
                <div
                  class="textfield-wrap s-mb-[1.375rem] sm:s-mb-0 sm:s-mr-5 md-x:!s-mr-[3.25rem] s-flex-1"
                >
                  <label
                    class="s-text-[#222228] s-text-sm s-font-semibold s-block s-mb-3"
                    >What furnishings are in the kitchen?</label
                  >
                  <MultipleSelect
                    :options="kitchenAmenityOptions"
                    :error="error && error.kitchenFurnishings"
                    :validation-msg="validationMsg($v.form.kitchenFurnishings)"
                    :selected-value="form.kitchenFurnishings"
                    @update="(value) => (form.kitchenFurnishings = value)"
                  />
                </div>
                <div class="s-flex-1">
                  <label
                    class="s-text-[#222228] s-text-sm s-font-semibold s-block s-mb-3"
                    >Which other room(s) make up your space?</label
                  >
                  <MultipleSelect
                    :options="spaceLayoutOptions"
                    :error="error && error.spaceLayout"
                    :validation-msg="validationMsg($v.form.spaceLayout)"
                    :selected-value="form.spaceLayout"
                    @update="(value) => (form.spaceLayout = value)"
                  />
                </div>
              </div>
            </div>
            <div class="s-mb-[2.125rem]">
              <p class="s-mb-[18px] s-text-base s-font-bold">
                General Services &amp; Amenities
              </p>
              <label
                class="s-text-[#222228] s-text-sm s-font-semibold s-block s-mb-3"
                >Select services and amenities available in this space</label
              >
              <div class="s-flex s-flex-col sm:s-flex-row">
                <div
                  class="textfield-wrap s-mb-[1.375rem] sm:s-mb-0 sm:s-mr-5 md-x:!s-mr-[3.25rem] s-flex-1"
                >
                  <MultipleSelect
                    :options="generalAmenityOptions"
                    :error="error && error.generalFurnishings"
                    :validation-msg="validationMsg($v.form.generalFurnishings)"
                    :selected-value="form.generalFurnishings"
                    @update="(value) => (form.generalFurnishings = value)"
                  />
                </div>
                <div class="s-flex-1"></div>
              </div>
            </div>
          </div>
        </div>
        <div
          class="border s-mt-auto s-flex s-justify-end md-s:s-hidden s-py-5 s-border-t s-border-solid lg:s-border-0 s-fixed s-bottom-0 s-w-full s-pr-4 s-left-0 s-bg-white"
        >
          <Button
            :class="'s-mr-1.5 s-w-[7.875rem] s-border-2 s-border-solid s-border-primary-blue s-py-2.5 s-font-bold'"
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
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import { required } from 'vuelidate/lib/validators'
import { validationMessage } from 'vuelidate-messages'
const formMessages = {
  livingRoomFurnishingsRequired: () => 'Kindly select living room furnishing',
  diningRoomFurnishingsRequired: () => 'Kindly select dining room furnishing',
  kitchenFurnishingsRequired: () => 'kindly select kitchen furnishing',
  generalFurnishingsRequired: () => 'Kindly select general furnishing',
  spaceLayoutRequired: () => 'Kindly select other rooms in your space',
}

export default {
  data() {
    return {
      form: {
        livingRoomFurnishings: [],
        diningRoomFurnishings: [],
        kitchenFurnishings: [],
        generalFurnishings: [],
        spaceLayout: [],
      },

      livingRoomOptions: [],
      diningRoomOptions: [],
      kitchenAmenityOptions: [],
      generalAmenityOptions: [],
      spaceLayoutOptions: [],
      livingCategoryId: null,
      diningCategoryId: null,
      kitchenCategoryId: null,
      generalCategoryId: null,
      error: null,
      loading: false,
      allFurnishing: [],
      layout: [],
      editMode: false,
    }
  },
  validations: {
    form: {
      livingRoomFurnishings: {
        livingRoomFurnishingsRequired: required,
      },
      diningRoomFurnishings: {
        diningRoomFurnishingsRequired: required,
      },
      kitchenFurnishings: {
        kitchenFurnishingsRequired: required,
      },
      generalFurnishings: {
        generalFurnishingsRequired: required,
      },
      spaceLayout: {
        spaceLayoutRequired: required,
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
  },
  watch: {
    propertySetUp: 'assignSetups',
  },
  mounted() {
    if (this.propertySetUp !== null) {
      this.assignSetups()
    }
    if (this.propertyListingId && this.step && this.currentLevel) {
      this.getFurnishing()
    }
  },
  methods: {
    validationMsg: validationMessage(formMessages),
    ...mapMutations('host/listing', ['UPDATE_LEVEL', 'TOGGLE_LOADING']),
    ...mapActions('host/listing', [
      'addFurnishing',
      'updateFurnishing',
      'getListingDetail',
      'deleteSpaceLayouts',
    ]),
    back() {
      this.$router.push({
        name: 'host-listing-space-details',
        query: { step: 1, level: 2 },
      })
      this.UPDATE_LEVEL(2)
    },
    updateMove() {
      this.$router.push({
        name: 'host-listing-space-details',
        query: { step: 1, level: 4 },
      })
      this.UPDATE_LEVEL(4)
    },
    next() {
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.error = this.$v.form
        this.scrolltoTop()
      } else {
        this.error = null
        this.submitAmenities()
        this.scrolltoTop()
      }
    },
    async submitAmenities() {
      this.loading = true

      const allLivingRoomAmenitiesId = this.form.livingRoomFurnishings.map(
        (allIDs) => {
          return allIDs.id
        }
      )
      const newLivingRoomAmenities = {
        amenity_cat_id: this.livingCategoryId,
        amenity_id: allLivingRoomAmenitiesId,
      }

      // kitchen
      const allKitchenAmenitiesId = this.form.kitchenFurnishings.map(
        (allIDs) => {
          return allIDs.id
        }
      )
      const newKitchenAmenities = {
        amenity_cat_id: this.kitchenCategoryId,
        amenity_id: allKitchenAmenitiesId,
      }

      // Dining
      const allDiningAmenitiesId = this.form.diningRoomFurnishings.map(
        (allIDs) => {
          return allIDs.id
        }
      )
      const newDiningAmenities = {
        amenity_cat_id: this.diningCategoryId,
        amenity_id: allDiningAmenitiesId,
      }

      // General
      const allGeneralAmenitiesId = this.form.generalFurnishings.map(
        (allIDs) => {
          return allIDs.id
        }
      )
      const newGeneralAmenities = {
        amenity_cat_id: this.generalCategoryId,
        amenity_id: allGeneralAmenitiesId,
      }

      // Layout
      // eslint-disable-next-line camelcase
      const space_layout_id = this.form.spaceLayout.map((layout) => layout.id)

      const allAmenities = [
        newLivingRoomAmenities,
        newKitchenAmenities,
        newDiningAmenities,
        newGeneralAmenities,
      ]

      const payload = {
        property_listing_id: this.propertyListingId,
        amenities: allAmenities,
        // eslint-disable-next-line camelcase
        space_layout_id,
      }
      if (this.editMode) {
        const results = this.form.spaceLayout.filter(
          ({ id: id1 }) =>
            !this.layout.some(({ space_layout_id: id2 }) => id2 === id1)
        )
        const newLayout = results.map((el) => ({ layoutId: el.id }))

        const oldLayout = this.layout.map((el) => {
          return {
            id: el.id,
            layoutId: el.space_layout_id,
          }
        })
        const spaceLayouts = oldLayout.concat(newLayout)

        const toDeleteLayout = this.layout
          .filter(
            ({ space_layout_id: id1 }) =>
              !this.form.spaceLayout.some(({ id: id2 }) => id2 === id1)
          )
          .map((el) => el.id)

        const allFurnishingArray = []
        for (const key in this.form) {
          if (
            key === 'livingRoomFurnishings' ||
            key === 'diningRoomFurnishings' ||
            key === 'kitchenFurnishings' ||
            key === 'generalFurnishings'
          ) {
            allFurnishingArray.push(...this.form[key])
          }
        }

        const toDeleteFurnishing = this.allFurnishing
          .map((el) => ({
            amenityCatId: el.amenities_cat_id,
            amenityId: el.amenities_id,
          }))
          .filter(
            ({ amenityId: id1, amenityCatId: catId1 }) =>
              !allFurnishingArray.some(
                ({ id: id2, amenities_cat_id: catId2 }) =>
                  id2 === id1 && catId1 === catId2
              )
          )

        const livingCategoryId = []
        const kitchenCategoryId = []
        const diningCategoryId = []
        const generalCategoryId = []

        toDeleteFurnishing.forEach((el) => {
          if (el.amenityCatId === this.diningCategoryId)
            diningCategoryId.push(el.amenityId)
          else if (el.amenityCatId === this.kitchenCategoryId)
            kitchenCategoryId.push(el.amenityId)
          else if (el.amenityCatId === this.livingCategoryId)
            livingCategoryId.push(el.amenityId)
          else if (el.amenityCatId === this.generalCategoryId)
            generalCategoryId.push(el.amenityId)
        })
        const data = []

        if (livingCategoryId.length) {
          data.push({
            amenityCatId: this.livingCategoryId,
            amenityId: livingCategoryId,
          })
        }
        if (diningCategoryId.length) {
          data.push({
            amenityCatId: this.diningCategoryId,
            amenityId: diningCategoryId,
          })
        }
        if (kitchenCategoryId.length) {
          data.push({
            amenityCatId: this.kitchenCategoryId,
            amenityId: kitchenCategoryId,
          })
        }
        if (generalCategoryId.length) {
          data.push({
            amenityCatId: this.generalCategoryId,
            amenityId: generalCategoryId,
          })
        }

        const selectedToDelete = {}

        if (data.length) {
          selectedToDelete.amenities = data
        }
        if (toDeleteLayout.length) {
          selectedToDelete.spaceLayouts = toDeleteLayout
        }

        if (Object.keys(selectedToDelete).length) {
          selectedToDelete.listingId = this.propertyListingId
          try {
            await this.deleteSpaceLayouts(selectedToDelete)
          } catch (error) {
            this.$errorHandler(error)
          }
        }

        const update = {
          property_listing_id: this.propertyListingId,
          amenities: allAmenities,
          spaceLayouts,
        }
        try {
          const response = await this.updateFurnishing(update)
          this.loading = false
          if (response.data.statusCode === 200) {
            this.updateMove()
          }
        } catch (error) {
          this.loading = false
          this.$errorHandler(error)
          return error
        }
      } else {
        try {
          const response = await this.addFurnishing(payload)
          this.loading = false
          if (response.data.statusCode === 201) {
            this.updateMove()
          }
        } catch (error) {
          this.loading = false
          this.$errorHandler(error)
          return error
        }
      }
    },
    scrolltoTop() {
      window.scrollTo(0, 0)
    },
    assignSetups() {
      if (this.propertySetUp) {
        this.propertySetUp.amenity_categories.filter((livingRoomAmenities) => {
          if (livingRoomAmenities.name === 'Living Room') {
            this.livingCategoryId = livingRoomAmenities.id
            this.livingRoomOptions = livingRoomAmenities.amenities.map(
              (newAmenities) => ({
                name: newAmenities.amenity_meta.name,
                id: newAmenities.amenity_id,
              })
            )
            this.moveNoneTop(this.livingRoomOptions)
          }
          return undefined
        })

        this.propertySetUp.amenity_categories.filter((kitchenAmenities) => {
          if (kitchenAmenities.name === 'Kitchen') {
            this.kitchenCategoryId = kitchenAmenities.id
            this.kitchenAmenityOptions = kitchenAmenities.amenities.map(
              (newAmenities) => ({
                name: newAmenities.amenity_meta.name,
                id: newAmenities.amenity_id,
              })
            )
            this.moveNoneTop(this.kitchenAmenityOptions)
          }
          return undefined
        })

        this.propertySetUp.amenity_categories.filter((diningAmenities) => {
          if (diningAmenities.name === 'Dinning Room') {
            this.diningCategoryId = diningAmenities.id
            this.diningRoomOptions = diningAmenities.amenities.map(
              (newAmenities) => ({
                name: newAmenities.amenity_meta.name,
                id: newAmenities.amenity_id,
              })
            )
            this.moveNoneTop(this.diningRoomOptions)
          }
          return undefined
        })

        this.propertySetUp.amenity_categories.filter((generalAmenities) => {
          if (generalAmenities.name === 'General') {
            this.generalCategoryId = generalAmenities.id
            this.generalAmenityOptions = generalAmenities.amenities.map(
              (newAmenities) => ({
                name: newAmenities.amenity_meta.name,
                id: newAmenities.amenity_id,
              })
            )
            this.moveNoneTop(this.generalAmenityOptions)
          }
          return undefined
        })

        this.spaceLayoutOptions = this.propertySetUp.space_layouts.map(
          (layoutOption) => ({
            id: layoutOption.id,
            name: layoutOption.name,
          })
        )
      }
    },
    async getFurnishing() {
      this.TOGGLE_LOADING(true)
      try {
        const response = await this.getListingDetail()
        this.TOGGLE_LOADING(false)
        if (response.data.statusCode === 200) {
          this.allFurnishing = response?.data?.data?.listingAmenities
          this.layout = response?.data?.data?.listingLayouts
          this.getAllAmenities()
        }
      } catch (error) {
        this.TOGGLE_LOADING(false)
        this.$errorHandler(error)
        return error
      }
    },
    assignIndividualFurnishing(type) {
      return this.allFurnishing
        .map((furnish, filtered) => {
          if (furnish.amenity_category.name === type) {
            filtered = {
              name: furnish.amenity_name.name,
              id: furnish.amenity_name.id,
              amenities_cat_id: furnish.amenities_cat_id,
            }
            return filtered
          }
          return undefined
        })
        .filter((notUndefined) => notUndefined !== undefined)
    },
    getAllAmenities() {
      // living room
      this.form.livingRoomFurnishings =
        this.assignIndividualFurnishing('Living Room')
      // kitchen
      this.form.kitchenFurnishings = this.assignIndividualFurnishing('Kitchen')
      // dining
      this.form.diningRoomFurnishings =
        this.assignIndividualFurnishing('Dinning Room')
      // General
      this.form.generalFurnishings = this.assignIndividualFurnishing('General')
      // Space layout
      this.form.spaceLayout = this.layout.map((returnedLayout) => ({
        id: returnedLayout.space_layout_name.id,
        name: returnedLayout.space_layout_name.name,
      }))

      this.editModeSetting()
    },
    moveNoneTop(data) {
      return data.unshift(
        ...data.splice(
          data.findIndex((v) => v.name === 'None'),
          1
        )
      )
    },
    editModeSetting() {
      if (this.form.livingRoomFurnishings.length > 0) {
        if (this.form.diningRoomFurnishings.length > 0) {
          if (this.form.kitchenFurnishings.length > 0) {
            if (this.form.generalFurnishings.length > 0) {
              if (this.form.spaceLayout.length > 0) {
                this.editMode = true
              }
            }
          }
        }
      } else {
        this.editMode = false
      }
    },
  },
}
</script>
