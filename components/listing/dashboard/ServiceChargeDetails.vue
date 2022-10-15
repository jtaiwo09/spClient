<template>
  <MoreInfoModal
    :new-class="'s-px-5 s-relative sm:s-px-7 s-pb-16  md-x:s-w-[647px] sm:s-w-[532px] s-min-w-[375px] s-w-full'"
    @cancel="closeForm"
  >
    <Loading v-if="loader" :class="'s-absolute'" />
    <transition>
      <div v-if="services" class="s-max-w-fit">
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
            Booking Information >
            <span class="s-text-[#2E48DA]">Service Charge</span>
          </h1>
          <p class="s-text-sm s-font-normal s-text-[#242428] s-leading-5">
            Update information about your space here
          </p>
        </div>
        <div class="s-mt-10 s-px-0.5">
          <div class="s-flex s-flex-col sm:s-flex-row">
            <div class="s-flex-1 sm:s-mr-8 s-mb-9">
              <CurrencyInput
                label="Monthly Service Charge"
                placeholder="₦ 0.00"
                :class="'s-w-full'"
                :error="error && error.monthlyServiceCharge"
                :validation-msg="
                  validationMsg($v.formData.monthlyServiceCharge)
                "
                :model-value="formData.monthlyServiceCharge"
                @update:modelValue="
                  (value) => (formData.monthlyServiceCharge = value)
                "
              />
              <FormFieldInfo>
                Service charge consists of cost of gas, power, cleaning and
                overall maintenance per individual room per month.
              </FormFieldInfo>
            </div>
            <div class="s-flex-1 s-mb-9">
              <CurrencyInput
                label="Security Deposit"
                placeholder="₦ 0.00"
                :class="'s-w-full'"
                :error="error && error.SecurityDeposit"
                :validation-msg="validationMsg($v.formData.SecurityDeposit)"
                :model-value="formData.SecurityDeposit"
                @update:modelValue="
                  (value) => (formData.SecurityDeposit = value)
                "
              />
              <FormFieldInfo>
                Security deposit is like caution fee to be refunded to the
                tenant after cancellation provided there's no damage or
                outstanding balance to be paid.
              </FormFieldInfo>
            </div>
          </div>
          <div>
            <p class="s-mb-5 s-text-[16px] s-font-bold">Cleaning & Power</p>
            <div class="s-flex s-flex-col sm:s-flex-row">
              <div class="s-w-full sm:s-w-1/2 sm:s-mr-8 s-mb-9">
                <label
                  class="s-text-[#222228] s-text-sm s-font-semibold s-block s-mb-3"
                >
                  Cleaning Service
                </label>
                <Select
                  :class="'s-mr-6 md:s-mr-8 s-w-full'"
                  name="cleaningService"
                  default-text="Select Option"
                  :options="cleaning"
                  no-margin-bottom
                  :value="formData.provideCleaning"
                  :error="error && error.provideCleaning"
                  :validation-msg="validationMsg($v.formData.provideCleaning)"
                  @update="(value) => (formData.provideCleaning = value)"
                />
              </div>
              <div class="s-w-full sm:s-w-1/2 s-mb-9">
                <label
                  class="s-text-[#222228] s-text-sm s-font-semibold s-block s-mb-3"
                >
                  Maintenance Service
                </label>
                <Select
                  :class="'s-mr-6 md:s-mr-8 s-w-full'"
                  name="maintenanceService"
                  default-text="Select Option"
                  :options="maintenance"
                  no-margin-bottom
                  :value="formData.provideMaintenance"
                  :error="error && error.provideMaintenance"
                  :validation-msg="
                    validationMsg($v.formData.provideMaintenance)
                  "
                  @update="(value) => (formData.provideMaintenance = value)"
                />
              </div>
            </div>
            <div class="sm:s-mr-8 s-mb-9">
              <label
                class="s-text-[#222228] s-text-sm s-font-semibold s-block s-mb-3"
              >
                What is the minimum hours of power can you guarantee per day?
              </label>
              <div class="s-relative s-flex s-items-center s-w-full sm:s-w-1/2">
                <input
                  v-model.number="formData.powerHour"
                  type="number"
                  name="name"
                  required
                  class="disabled:s-border-none disabled:s-ring-0 disabled:s-bg-[#f4f6ff] disabled:s-cursor-not-allowed s-pr-20 s-py-3.5 s-pl-[1.375rem] s-font-normal s-placeholder-[#8F8FB1] s-text-[#000] s-text-sm s-rounded-full s-border-none s-ring-1 s-ring-[#99A4E1] focus:s-bg-[#F1F3FF] focus:s-ring-primary-blue focus:s-ring-2 s-bg-[#FAFAFE] s-w-full focus:s-outline-none"
                  placeholder="Enter Number"
                  autocomplete="off"
                />
                <span
                  class="s-absolute s-right-5 s-text-sm s-text-[#0F0C3D] s-font-semibold"
                  >Hour</span
                >
              </div>
              <FormFieldError
                :validation-msg="validationMsg($v.formData.powerHour)"
              />
            </div>
          </div>
        </div>
      </div>
    </transition>
  </MoreInfoModal>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { required } from 'vuelidate/lib/validators'
import { validationMessage } from 'vuelidate-messages'

const formMessages = {
  provideCleaningRequired: () => 'Required',
  provideMaintenanceRequired: () => 'Required',
  monthlyServiceChargeRequired: () => 'Required',
  SecurityDepositRequired: () => 'Required',
  powerHourRequired: () => 'Required',
}

export default {
  data() {
    return {
      loading: false,
      formData: {
        provideCleaning: '',
        provideMaintenance: '',
        monthlyServiceCharge: '',
        SecurityDeposit: '',
        powerHour: '',
      },
      services: null,
      error: null,
      serviceChargeAndSecurityDeposit: null,
      listingMaintenance: null,
    }
  },
  validations: {
    formData: {
      provideCleaning: { provideCleaningRequired: required },
      provideMaintenance: { provideMaintenanceRequired: required },
      monthlyServiceCharge: { monthlyServiceChargeRequired: required },
      SecurityDeposit: { SecurityDepositRequired: required },
      powerHour: { powerHourRequired: required },
    },
  },
  computed: {
    ...mapState('host/listing', ['propertyListingId', 'loader']),
    cleaning() {
      return [
        { text: 'Yes, I will provide Cleaning', value: true },
        { text: 'No, I will not provide Cleaning', value: false },
      ]
    },
    maintenance() {
      return [
        { text: 'Yes, I will provide Maintenance', value: true },
        { text: 'No, I will not provide Maintenance', value: false },
      ]
    },
  },
  watch: {
    services() {
      this.assignServiceCharge()
    },
  },

  mounted() {
    this.getServiceCharge()
  },
  methods: {
    ...mapActions('host/listing', ['getListingDetail', 'updateServiceCharge']),
    validationMsg: validationMessage(formMessages),
    closeForm() {
      this.$emit('cancel')
    },
    async getServiceCharge() {
      try {
        const response = await this.getListingDetail()
        if (response.data.statusCode === 200) {
          this.services = response.data.data
          this.listingMaintenance = this.services?.listingMaintenance
          this.serviceChargeAndSecurityDeposit =
            this.services?.listingServiceChargeAndSecDeposit
          this.serviceChargeAndSecurityDeposit.forEach((el) => {
            if (el.sub_plan === 'monthly') {
              this.formData.monthlyServiceCharge = Number(el.service_charge)
              this.formData.SecurityDeposit = Number(el.securityDeposit)
            }
            this.formData.powerHour =
              this.listingMaintenance &&
              Number(this.listingMaintenance.power_duration)
            this.formData.provideMaintenance =
              this.listingMaintenance?.provide_maintenance
            this.formData.provideCleaning =
              this.listingMaintenance?.provide_cleaning
          })
        }
      } catch (error) {
        this.$errorHandler(error)
      }
    },
    convertToNumber(str) {
      const newStr = str.replace(/\D/g, '')
      return Number(newStr)
    },
    async submitForm() {
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.error = this.$v.formData
      } else {
        const data = {}
        const {
          monthlyServiceCharge,
          SecurityDeposit,
          provideCleaning,
          provideMaintenance,
          powerHour,
        } = this.formData
        data.property_listing_id = this.propertyListingId
        data.service_charge = this.convertToNumber(monthlyServiceCharge)
        data.securityDeposit = this.convertToNumber(SecurityDeposit)
        data.maintenance = {
          provide_cleaning: provideCleaning,
          provide_maintenance: provideMaintenance,
          power_duration: powerHour,
        }
        this.loading = true
        try {
          const response = await this.updateServiceCharge(data)
          this.loading = false
          if (response.data.statusCode === 200) {
            this.services = response.data.data
            this.closeForm()
          }
        } catch (error) {
          this.loading = false
          this.$errorHandler(error)
        }
      }
    },
    assignServiceCharge() {
      this.serviceChargeAndSecurityDeposit.forEach((charge) => {
        if (charge.sub_plan === 'monthly') {
          this.formData.monthlyServiceCharge =
            charge.service_charge === '0.00' ? 0 : Number(charge.service_charge)
          this.formData.SecurityDeposit =
            charge.securityDeposit === '0.00'
              ? 0
              : Number(charge.securityDeposit)
        }
      })
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
