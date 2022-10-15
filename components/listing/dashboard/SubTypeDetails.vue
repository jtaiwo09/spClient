<template>
  <MoreInfoModal
    :new-class="'s-px-5 s-relative sm:s-px-7 s-pb-16  md-x:s-w-[647px] sm:s-w-[532px] s-min-w-[375px] s-w-full'"
    @cancel="closeForm"
  >
    <Loading v-if="loader" :class="'s-absolute'" />
    <transition>
      <div v-if="fetchedData" class="s-max-w-fit">
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
            @submit="next"
          />
        </div>
        <div class="s-mt-3">
          <h1
            class="s-text-[#121212] s-mb-1.5 sm:s-text-xl s-text-lg s-leading-6 s-font-bold"
          >
            Booking Information >
            <span class="s-text-[#2E48DA]">Subscription Type</span>
          </h1>
          <p class="s-text-sm s-font-normal s-text-[#242428] s-leading-5">
            Update information about your space here
          </p>
        </div>
        <div class="s-mt-10 s-px-0.5">
          <div class="s-mb-[2.125rem]">
            <p class="s-font-bold s-text-[16px] s-text-[#222228] s-mb-1">
              Select subscription
            </p>
            <label
              class="s-text-[#646466] s-text-xs s-font-normal s-block s-mb-4"
              >You can select multiple options here</label
            >
            <div class="s-flex s-gap-y-2 s-items-center s-flex-wrap">
              <div
                class="s-mr-6"
                @click="
                  formData.monthly
                    ? (formData.monthly = false)
                    : (formData.monthly = true),
                    handleClick('monthly')
                "
              >
                <CheckBox
                  v-model="formData.monthly"
                  :value="formData.monthly"
                  label="Monthly"
                  name="monthly"
                />
              </div>
              <div
                class="s-mr-6"
                @click="
                  formData.monthly
                    ? formData.quarterly
                      ? (formData.quarterly = false)
                      : (formData.quarterly = true)
                    : null,
                    handleClick('quarterly')
                "
              >
                <CheckBox
                  v-model="formData.quarterly"
                  label="Quarterly"
                  name="quarterly"
                  :disabled="!formData.monthly"
                />
              </div>
              <div
                class="s-mr-6"
                @click="
                  formData.monthly
                    ? formData.biannual
                      ? (formData.biannual = false)
                      : (formData.biannual = true)
                    : null,
                    handleClick('biannual')
                "
              >
                <CheckBox
                  v-model="formData.biannual"
                  label="Biannually"
                  name="biannually"
                  :disabled="!formData.monthly"
                />
              </div>

              <div
                @click="
                  formData.monthly
                    ? formData.yearly
                      ? (formData.yearly = false)
                      : (formData.yearly = true)
                    : null,
                    handleClick('yearly')
                "
              >
                <CheckBox
                  v-model="formData.yearly"
                  label="Annually"
                  name="annually"
                  :disabled="!formData.monthly"
                />
              </div>
            </div>
            <FormFieldError
              :validation-msg="validationMsg($v.formData.subPlan)"
            />
            <FormFieldInfo>
              For unfurnished spaces, members are billed on a quarterly,
              biannual or annual basis.
            </FormFieldInfo>
          </div>
          <div class="s-mb-[2.125rem]">
            <p
              class="s-font-bold s-text-[16px] s-text-[#222228] s-mb-[0.875rem] s-ml-1"
            >
              Availability
            </p>
            <div class="s-flex s-flex-col sm:s-flex-row">
              <Date
                :class="'s-w-full s-mr-10'"
                label="From"
                :min-date="new Date()"
                :error="error && error.from"
                :validation-msg="validationMsg($v.formData.from)"
                :model-value="formData.from"
                @update:modelValue="(value) => (formData.from = value)"
              />
              <Date
                :class="'s-w-full'"
                label="To"
                :min-date="minDate"
                :error="error && error.to"
                :validation-msg="validationMsg($v.formData.to)"
                :model-value="formData.to"
                @update:modelValue="(value) => (formData.to = value)"
              />
            </div>
            <FormFieldInfo :class="'s-mt-0'">
              Please note that you are obligated to ensure that the space(s)
              listed must be available for subscription on the dates you have
              inputted.
            </FormFieldInfo>
          </div>
          <div class="s-mb-[2.125rem]">
            <div class="s-mb-6">
              <p
                class="s-font-bold s-text-[16px] s-text-[#222228] s-mb-[0.875rem]"
              >
                Pick the days you’re available for viewing
              </p>
              <p class="s-text-xs s-text-[#646466] s-font-normal">
                Pick the days you’re available for viewing
              </p>
            </div>
            <div
              class="s-flex s-flex-wrap s-items-center s-gap-x-2 s-gap-y-4 s-max-w-[29.5rem]"
            >
              <SelectButton
                v-for="(el, index) in dayForViewing"
                :key="index"
                :name="el.day"
                :value="
                  formData.viewing_days.some((obj) => obj.day === el.day)
                    ? el.day
                    : ''
                "
                :text="el.day"
                @submit="handleViewingDate(el)"
              />
            </div>
            <FormFieldError
              :validation-msg="validationMsg($v.formData.viewing_days)"
            />
          </div>
        </div>
      </div>
    </transition>
  </MoreInfoModal>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import { required } from 'vuelidate/lib/validators'
import { validationMessage } from 'vuelidate-messages'
import { formattedDate } from '@/helpers/utils'

const formMessages = {
  requiredSubPlan: () => 'Please select a subscription plan',
  fromRequired: () => 'Availabilty date from is required',
  toRequired: () => 'Availabilty date to is required',
  viewingDateRequired: () => 'Please select your available date(s) for viewing',
}

export default {
  data() {
    return {
      loading: false,
      formData: {
        subPlan: [],
        monthly: false,
        quarterly: false,
        biannual: false,
        yearly: false,
        from: '',
        to: '',
        viewing_days: [],
      },
      dateRange: {},
      error: null,
      fetchedData: null,
      preSelected: [],
      toDelete: [],
      toUpdate: [],
    }
  },
  validations: {
    formData: {
      subPlan: {
        requiredSubPlan: required,
      },
      from: {
        fromRequired: required,
      },
      to: {
        toRequired: required,
      },
      viewing_days: {
        viewingDateRequired: required,
      },
    },
  },
  computed: {
    ...mapState('host/listing', ['propertyListingId', 'loader', 'addDiscount']),
    minDate() {
      if (this.formData.from !== '') {
        return this.formData.from
      } else {
        return new Date()
      }
    },
    dayForViewing() {
      return [
        { day: 'sunday' },
        { day: 'monday' },
        { day: 'tuesday' },
        { day: 'wednesday' },
        { day: 'thursday' },
        { day: 'friday' },
        { day: 'saturday' },
      ]
    },
  },
  watch: {
    fetchedData: 'updateForm',
    'formData.monthly'(val) {
      if (val) {
        this.formData.subPlan.push('monthly')
      } else {
        const index = this.formData.subPlan.findIndex(
          (item) => item === 'monthly'
        )
        this.formData.subPlan.splice(index, 1)
      }
    },
    'formData.quarterly'(val) {
      if (val) {
        this.formData.subPlan.push('quarterly')
      } else {
        const index = this.formData.subPlan.findIndex(
          (item) => item === 'quarterly'
        )
        this.formData.subPlan.splice(index, 1)
      }
    },
    'formData.biannual'(val) {
      if (val) {
        this.formData.subPlan.push('biannual')
      } else {
        const index = this.formData.subPlan.findIndex(
          (item) => item === 'biannual'
        )
        this.formData.subPlan.splice(index, 1)
      }
    },
    'formData.yearly'(val) {
      if (val) {
        this.formData.subPlan.push('yearly')
      } else {
        const index = this.formData.subPlan.findIndex(
          (item) => item === 'yearly'
        )
        this.formData.subPlan.splice(index, 1)
      }
    },
  },
  async mounted() {
    await this.getPaymentDetails()
  },
  methods: {
    ...mapActions('host/listing', [
      'addSubscription',
      'updateSubscription',
      'getListingDetail',
      'deleteSubPlan',
      'deleteViewingDay',
    ]),
    ...mapMutations('host/listing', ['SET_SUB_PLAN']),
    validationMsg: validationMessage(formMessages),
    closeForm() {
      this.$emit('cancel')
    },
    async next() {
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.error = this.$v.formData
      } else {
        this.error = null
        this.loading = true
        const toUpdate = []
        this.preSelected.forEach((el) => {
          const check = this.formData.subPlan.includes(el.plan)
          check && toUpdate.push(el.plan)
        })
        const difference = this.formData.subPlan.filter(
          (x) => !toUpdate.includes(x)
        )
        const newSubPlan = difference
          .map((el) => ({ plan: el }))
          .concat(this.preSelected)
        const data = {
          sub_plan: newSubPlan,
          property_listing_id: this.propertyListingId,
          from: formattedDate(this.formData.from),
          to: formattedDate(this.formData.to),
          viewing_days: this.formData.viewing_days.map((el) => el.day),
        }
        if (this.toDelete.length) {
          try {
            await this.deleteSubPlan({ subPlans: this.toDelete })
          } catch (error) {
            this.$errorHandler(error)
          }
        }

        try {
          await this.updateSubscription(data)
          this.loading = false
          this.closeForm()
        } catch (error) {
          this.loading = false
          this.$errorHandler(error)
        }
      }
    },
    async getPaymentDetails() {
      try {
        const response = await this.getListingDetail()
        if (response.data.statusCode === 200) {
          const data = response.data.data
          if (data) {
            this.fetchedData = data
          }
          Object.keys(data).length &&
            this.SET_SUB_PLAN(data.listingSub.subscription_plan)
        }
      } catch (error) {
        this.$errorHandler(error)
      }
    },
    updateForm() {
      this.formData.from = this.fetchedData.propertyAvailability
        ? new Date(this.fetchedData.propertyAvailability.from)
        : ''
      this.formData.to = this.fetchedData.propertyAvailability
        ? new Date(this.fetchedData.propertyAvailability.to)
        : ''
      const data = this.fetchedData.listingSub?.subscription_plan
      data &&
        data.forEach((el) => {
          this.formData[el.plan] = true
          this.preSelected.push({ plan: el.plan, id: el.id })
        })
      this.formData.viewing_days = this.fetchedData.listingViewingDays.map(
        (el) => el
      )
    },
    handleClick(e) {
      const check = !this.formData.subPlan.includes(e)
      if (!check) {
        if (e !== 'monthly') {
          const plan = this.preSelected.some((el) => el.plan === e)
          plan && this.toDelete.push(e)
        }
      } else {
        this.preSelected.forEach((el) => {
          if (el.plan === e) {
            this.toDelete = this.toDelete.filter((el) => el !== e)
          }
        })
      }
    },
    async handleViewingDate(obj) {
      const check = this.formData.viewing_days.find((el) => el.day === obj.day)
      if (check) {
        const index = this.formData.viewing_days.findIndex(
          (el) => el.day === obj.day
        )
        this.formData.viewing_days.splice(index, 1)
        if (check?.id) {
          try {
            await this.deleteViewingDay(check?.id)
          } catch (error) {
            this.$errorHandler(error)
          }
        }
      } else {
        this.formData.viewing_days.push(obj)
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
</style>
