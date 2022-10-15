<template>
  <MoreInfoModal
    :new-class="'s-px-5 s-relative sm:s-px-7 s-pb-16  md-x:s-w-[647px] sm:s-w-[532px] s-min-w-[375px] s-w-full'"
    @cancel="closeForm"
  >
    <Loading v-if="loader" :class="'s-absolute'" />
    <transition>
      <div v-if="propertyDetail" class="s-max-w-fit">
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
            :loading="loading"
            class="s-bg-primary-blue s-text-sm s-leading-[18px] s-text-white s-font-bold s-px-10 s-mr-2 s-rounded-full sm:s-py-[15px] s-py-[12px]"
            @submit="submitForm"
          />
        </div>
        <div class="s-mt-3">
          <h1
            class="s-text-[#121212] s-mb-1.5 sm:s-text-xl s-text-lg s-leading-6 s-font-bold"
          >
            Listing Information >
            <span class="s-text-[#2E48DA]">Space Details</span>
          </h1>
          <p class="s-text-sm s-font-normal s-text-[#242428] s-leading-5">
            Update information about your space here
          </p>
        </div>
        <div class="s-mt-10 s-px-0.5">
          <div class="s-mb-[2.125rem]">
            <label
              class="s-text-[#222228] s-text-sm s-font-semibold s-block s-mb-3"
            >
              What type of space is it?
            </label>
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
            <FormFieldInfo v-if="formData.space">{{ spaceInfo }}</FormFieldInfo>
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
    </transition>
  </MoreInfoModal>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
import { mapState, mapMutations, mapActions } from 'vuex'

import { validationMessage } from 'vuelidate-messages'
import MoreInfoModal from '../../reusables/MoreInfoModal.vue'
import Loading from '../../Loading.vue'
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
  components: {
    MoreInfoModal,
    Loading,
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
      error: null,
      loading: false,
      propertyDetail: null,
    }
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
        return this.propertySetUp?.propertyTypes
      }
      return []
    },
    subTypeOptions() {
      if (this.propertySetUp) {
        return this.propertySetUp?.subscription_type.filter(
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
  // watch: {
  //   space(newValue) {
  //     if (newValue === 'both' || newValue === 'entire') {
  //       this.liveIn = 'No'
  //     }
  //   },
  // },
  mounted() {
    if (this.propertyListingId && this.step && this.currentLevel) {
      this.getSpaceDetials()
    }
  },
  methods: {
    validationMsg: validationMessage(formMessages),
    ...mapMutations('host/listing', [
      'UPDATE_LEVEL',
      'UPDATE_PROPERTY_ID',
      'TOGGLE_LOADING',
    ]),
    ...mapActions('host/listing', [
      'updateBasicInformation',
      'getListingDetail',
    ]),
    async submitForm() {
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.error = this.$v.formData
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
        try {
          const response = await this.updateBasicInformation({
            ...data,
            property_listing_id: this.propertyListingId,
          })
          this.loading = false
          if (response.data.statusCode === 200) {
            this.$emit('cancel')
          }
        } catch (error) {
          this.loading = false
          this.$errorHandler(error)
        }
      }
    },
    async getSpaceDetials() {
      try {
        const response = await this.getListingDetail()
        if (response.data.statusCode === 200) {
          this.propertyDetail = response.data.data

          this.propertySetUp.propertyTypes.forEach((spaceType) => {
            if (spaceType.id === this.propertyDetail.property_type_cat_id) {
              this.formData.spaceType = spaceType
              spaceType.property_type.forEach((buildingType) => {
                if (buildingType.id === this.propertyDetail.property_type_id) {
                  this.formData.buildingType = buildingType
                }
              })
            }
          })

          this.formData.space = this.propertyDetail.listing_type
          this.formData.liveIn = this.propertyDetail.live_in_space
          this.formData.bathrooms = this.propertyDetail.no_baths
          this.formData.bedrooms = String(this.propertyDetail.no_rooms)
          this.formData.isFurnished = this.propertyDetail.is_furnished
        }
      } catch (error) {
        this.$errorHandler(error)
      }
    },
    closeForm() {
      this.$emit('cancel')
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
