<template>
  <MoreInfoModal
    :new-class="'s-px-5 s-relative sm:s-px-7 s-pb-16  md-x:s-w-[647px] sm:s-w-[532px] s-min-w-[375px] s-w-full'"
    @cancel="closeForm"
  >
    <Loading v-if="loader" :class="'s-absolute'" />
    <transition>
      <div v-if="allFurnishing.length" class="s-min-w-fit">
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
            <span class="s-text-[#2E48DA]">Furnishings</span>
          </h1>
          <p class="s-text-sm s-font-normal s-text-[#242428] s-leading-5">
            Update information about your space here
          </p>
        </div>
        <div class="s-mt-10 s-px-0.5">
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
      </div>
    </transition>
  </MoreInfoModal>
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
    closeForm() {
      this.$emit('cancel')
    },
    submitForm() {
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.error = this.$v.form
      } else {
        this.error = null
        this.submitAmenities()
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

      const allAmenities = [
        newLivingRoomAmenities,
        newKitchenAmenities,
        newDiningAmenities,
        newGeneralAmenities,
      ]

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
          this.closeForm()
        }
      } catch (error) {
        this.loading = false
        this.$errorHandler(error)
        return error
      }
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
