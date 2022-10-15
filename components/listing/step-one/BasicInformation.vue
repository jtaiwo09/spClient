<template>
  <div>
    <Loading v-if="loader" />
    <div v-else class="r-wrap md-s:!s-min-h-fit s-pb-[3rem]">
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
            :class="'s-w-[7.875rem] s-bg-primary-blue  s-py-2.5 s-font-bold s-text-[#fff]'"
            text="Next"
            :loading="loading"
            @submit="next"
          />
        </div>
      </div>
      <div class="s-flex md-s:s-block s-flex-col">
        <div class="s-px-6 md-x:!s-px-[3.25rem]">
          <div
            class="s-w-full s-h-[13.125rem] s-rounded-2xl s-overflow-hidden s-mb-[2.375rem] s-hidden md-s:s-block"
          >
            <img
              src="https://res.cloudinary.com/spleetng/image/upload/v1654566885/frontend-images/space-details-1.jpg"
              alt=""
              class="s-w-full s-h-full s-object-cover"
            />
          </div>
          <div>
            <div class="s-mb-[2.125rem]">
              <label
                class="s-text-[#222228] s-text-sm s-font-semibold s-block s-mb-3"
                >What type of space is it?</label
              >
              <div class="s-flex">
                <SelectButton
                  v-for="(spaceTypeOption, index) in spaceTypeOptions"
                  :key="index"
                  :name="spaceTypeOption.name"
                  :value="formData.spaceType.name"
                  :text="spaceTypeOption.name"
                  :error="error && error.spaceType"
                  @submit="formData.spaceType = spaceTypeOption"
                />
              </div>
              <FormFieldError
                :validation-msg="validationMsg($v.formData.spaceType)"
              />
              <FormFieldInfo v-if="formData.spaceType">{{
                formData.spaceType.description
              }}</FormFieldInfo>
            </div>
            <div v-if="formData.spaceType" class="s-mb-[2.125rem]">
              <label
                class="s-text-[#222228] s-text-sm s-font-semibold s-block s-mb-3"
                >Please select your space type</label
              >
              <div class="s-flex s-flex-wrap s-gap-1">
                <SelectButton
                  v-for="(building, index) in formData.spaceType.property_type"
                  :key="index"
                  :name="building.name"
                  :value="formData.buildingType.name"
                  :text="building.name"
                  :error="error && error.buildingType"
                  @submit="formData.buildingType = building"
                />
              </div>
              <FormFieldError
                :validation-msg="validationMsg($v.formData.buildingType)"
              />
              <FormFieldInfo v-if="formData.buildingType">{{
                formData.buildingType.description
              }}</FormFieldInfo>
            </div>
            <div class="s-mb-[2.125rem]">
              <label
                class="s-text-[#222228] s-text-sm s-font-semibold s-block s-mb-3"
                >What’s the status of your space?</label
              >
              <Select
                :class="'sm:!s-mb-0 sm:s-w-[18.5rem]'"
                name="spaceStatus"
                default-text="Select Status"
                :options="spaceStatus"
                no-margin-bottom
                :error="error && error.isFurnished"
                :validation-msg="validationMsg($v.formData.isFurnished)"
                :value="formData.isFurnished"
                @update="(value) => (formData.isFurnished = value)"
              />
              <FormFieldInfo v-if="formData.isFurnished !== ''">{{
                isFurnishedInfo
              }}</FormFieldInfo>
            </div>
            <div class="s-mb-[2.125rem]">
              <label
                class="s-text-[#222228] s-text-sm s-font-semibold s-block s-mb-3"
                >How would you like to list your space?</label
              >
              <div class="s-flex s-flex-wrap s-gap-1">
                <SelectButton
                  name="shared"
                  :value="formData.space"
                  text="Shared Space"
                  :disabled="formData.isFurnished == false"
                  :error="error && error.serviced"
                  @submit="
                    formData.isFurnished === false
                      ? null
                      : (formData.space = 'shared')
                  "
                />
                <SelectButton
                  name="entire"
                  :value="formData.space"
                  text="Entire Unit"
                  :error="error && error.space"
                  @submit="formData.space = 'entire'"
                />
                <SelectButton
                  name="both"
                  :value="formData.space"
                  text="Both"
                  :disabled="formData.isFurnished === false"
                  :error="error && error.space"
                  @submit="
                    formData.isFurnished !== false && (formData.space = 'both')
                  "
                />
              </div>
              <FormFieldError
                :validation-msg="validationMsg($v.formData.space)"
              />
              <FormFieldInfo v-if="formData.space">{{
                spaceInfo
              }}</FormFieldInfo>
            </div>
            <div class="s-mb-[2.125rem]">
              <label
                class="s-text-[#222228] s-text-sm s-font-semibold s-block s-mb-3"
                >Do you live in this space?</label
              >
              <div class="s-flex">
                <SelectButton
                  name="Yes"
                  :value="formData.liveIn"
                  text="Yes"
                  :disabled="
                    formData.space === 'entire' || formData.space === 'both'
                  "
                  :error="error && error.space"
                  @submit="formData.liveIn = 'Yes'"
                />
                <SelectButton
                  name="No"
                  :value="formData.liveIn"
                  text="No"
                  :error="error && error.liveIn"
                  @submit="formData.liveIn = 'No'"
                />
              </div>
              <FormFieldError
                :validation-msg="validationMsg($v.formData.liveIn)"
              />
            </div>
            <div class="s-flex s-flex-col sm:s-flex-row">
              <div
                class="textfield-wrap s-mb-[1.375rem] sm:s-mb-0 sm:s-mr-5 md-x:!s-mr-[3.25rem] s-flex-1"
              >
                <label
                  class="s-text-[#222228] s-text-sm s-font-semibold s-block s-mb-3"
                  >How many bedrooms are in your space?</label
                >
                <TextField
                  :class="'s-mr-6 md:s-mr-8 s-w-full !s-mb-0'"
                  placeholder="Enter a number"
                  type="number"
                  name="bedrooms"
                  :error="error && error.bedrooms"
                  :validation-msg="validationMsg($v.formData.bedrooms)"
                  :model-value="formData.bedrooms"
                  @update:modelValue="(value) => (formData.bedrooms = value)"
                />
              </div>
              <div class="s-flex-1 s-mb-[1.375rem] sm:s-mb-0">
                <label
                  class="s-text-[#222228] s-text-sm s-font-semibold s-block s-mb-3"
                  >How many bathrooms are in your space?</label
                >
                <TextField
                  :class="'s-mr-6 md:s-mr-8 s-w-full !s-mb-0'"
                  placeholder="Enter a number"
                  type="number"
                  name="bathrooms"
                  :error="error && error.bathrooms"
                  :validation-msg="validationMsg($v.formData.bathrooms)"
                  :model-value="formData.bathrooms"
                  @update:modelValue="(value) => (formData.bathrooms = value)"
                />
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
  spaceTypeRequired: () => 'Space type is required',
  buildingTypeRequired: () => 'Building type is required',
  isFurnishedRequired: () => 'kindly select space status',
  spaceRequired: () => 'Kindly select how you would like to list your space',
  liveInRequired: () => 'Kindly select if you live in this space or not',
  bathroomsRequired: () => 'Number of bathrooms is required',
  bedroomsRequired: () => 'Number of bedrooms is required',
}

export default {
  data() {
    return {
      formData: {
        spaceType: '',
        buildingType: '',
        isFurnished: '',
        space: '',
        liveIn: '',
        bathrooms: '',
        bedrooms: '',
      },
      loading: false,
      error: null,
    }
  },
  validations: {
    formData: {
      spaceType: {
        spaceTypeRequired: required,
      },
      buildingType: {
        buildingTypeRequired: required,
      },
      isFurnished: {
        isFurnishedRequired: required,
      },
      space: {
        spaceRequired: required,
      },
      liveIn: {
        liveInRequired: required,
      },
      bathrooms: {
        bathroomsRequired: required,
      },
      bedrooms: {
        bedroomsRequired: required,
      },
    },
  },
  computed: {
    ...mapState('host/listing', [
      'propertySetUp',
      'loader',
      'propertyListingId',
      'currentLevel',
      'step',
    ]),
    spaceTypeOptions() {
      if (this.propertySetUp) {
        return this.propertySetUp.propertyTypes
      }
      return []
    },
    subTypeOptions() {
      if (this.propertySetUp) {
        return this.propertySetUp.subscription_type.filter(
          (el) => el.code === 'RLS'
        )
      }
      return []
    },
    spaceStatus() {
      return [
        { text: 'Furnished', value: true },
        { text: 'Unfurnished', value: false },
      ]
    },
    selectedOption() {
      if (this.formData.isFurnished === true) return 'Furnished'
      else if (this.formData.isFurnished === false) return 'Unurnished'
      else return ''
    },
    isFurnishedInfo() {
      if (this.formData.isFurnished === true) {
        return `A fully furnished space comprises of furniture, beddings, curtains,
          lamps, fittings, gas cooker, microwave oven, fridge/freezer, washing
          machine, gas cylinders and piping to the kitchen, air conditioners,
          smart television etc.`
      } else {
        return `Unfurnished Spaces can only be listed as entire spaces`
      }
    },
    spaceInfo() {
      if (this.formData.space === 'shared') {
        return ` Members sleep in their private bedroom with ensuite or adjoining
          bathroom and toilet, with common area and kitchen that could be shared
          with others.`
      } else if (this.formData.space === 'entire') {
        return `Members have the whole unit to themselves. This usually includes a
          bedroom, a bathroom, a living room and a kitchen.`
      } else {
        return `This space will be listed as a co-shared and an entire unit.`
      }
    },
  },
  watch: {
    space(newValue) {
      if (newValue === 'both' || newValue === 'entire') {
        this.liveIn = 'No'
      }
    },
  },
  mounted() {
    if (this.propertyListingId && this.step && this.currentLevel) {
      this.getSpaceDetials()
    }
  },
  methods: {
    ...mapMutations('host/listing', [
      'UPDATE_LEVEL',
      'UPDATE_PROPERTY_ID',
      'TOGGLE_LOADING',
    ]),
    ...mapActions('host/listing', [
      'addBasicInformation',
      'updateBasicInformation',
      'getListingDetail',
    ]),
    validationMsg: validationMessage(formMessages),
    updateMove() {
      this.$router.push({
        name: 'host-listing-space-details',
        query: { step: 1, level: 2 },
      })
      this.UPDATE_LEVEL(2)
    },
    back() {
      this.$router.push(
        `/host/listing/continue-listing?id=${this.propertyListingId}&next=true`
      )
    },
    async next() {
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.error = this.$v.formData
        this.scrolltoTop()
      } else {
        this.error = null
        this.loading = true
        const data = {
          property_type_id: this.formData.buildingType.id,
          property_type_cat_id: this.formData.spaceType.id,
          listing_type: this.formData.space,
          live_in_space: this.formData.liveIn,
          is_furnished: this.formData.isFurnished,
          no_rooms: this.formData.bedrooms,
          no_baths: this.formData.bathrooms,
        }
        if (this.propertyListingId) {
          try {
            const response = await this.updateBasicInformation({
              ...data,
              property_listing_id: this.propertyListingId,
            })
            this.loading = false
            if (response.data.statusCode === 200) {
              this.updateMove()
              this.scrolltoTop()
            }
          } catch (error) {
            this.loading = false
            this.$errorHandler(error)
          }
        } else {
          try {
            const response = await this.addBasicInformation(data)
            this.loading = false
            if (response.data.statusCode === 201) {
              const propertyId = response.data.data.id
              localStorage.setItem('propertyId', JSON.stringify(propertyId))
              this.UPDATE_PROPERTY_ID(propertyId)
              this.updateMove()
              this.scrolltoTop()
            }
          } catch (error) {
            this.loading = false
            this.$errorHandler(error)
          }
        }
      }
    },

    async getSpaceDetials() {
      this.TOGGLE_LOADING(true)
      try {
        const response = await this.getListingDetail()
        this.TOGGLE_LOADING(false)
        if (response.data.statusCode === 200) {
          const propertyDetail = response.data.data

          this.propertySetUp.propertyTypes.forEach((spaceType) => {
            if (spaceType.id === propertyDetail.property_type_cat_id) {
              this.formData.spaceType = spaceType
              spaceType.property_type.forEach((buildingType) => {
                if (buildingType.id === propertyDetail.property_type_id) {
                  this.formData.buildingType = buildingType
                }
              })
            }
          })

          this.formData.space = propertyDetail.listing_type
          this.formData.liveIn = propertyDetail.live_in_space
          this.formData.bathrooms = propertyDetail.no_baths
          this.formData.bedrooms = String(propertyDetail.no_rooms)
          this.formData.isFurnished = propertyDetail.is_furnished
        }
      } catch (error) {
        this.TOGGLE_LOADING(false)
        this.$errorHandler(error)
      }
    },

    scrolltoTop() {
      window.scrollTo(0, 0)
    },
  },
}
</script>
