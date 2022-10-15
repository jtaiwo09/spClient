<template>
  <div>
    <Loading v-if="loading" />
    <div v-else class="md-s:!s-min-h-fit">
      <div
        class="s-mb-2 s-px-6 md-x:!s-px-[3.25rem] s-flex s-justify-between s-items-center s-sticky s-top-0 md-s:s-top-2.5 s-h-[100px] s-w-full s-bg-[#fff] s-z-20"
      >
        <div>
          <h2 class="title s-text-[1.25rem] s-mb-0">Subscription & Booking</h2>
          <p class="sub-title !s-leading-[1.375rem] s-text-xs">
            Service Charge
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
            :class="'s-w-[7.875rem] s-bg-primary-blue  s-py-2.5 s-font-bold s-text-[#fff]'"
            text="Next"
            :loading="loader"
            @submit="next"
          />
        </div>
      </div>
      <div class="s-flex md-s:s-block s-flex-col">
        <div class="s-px-6 md-x:!s-px-[3.25rem]">
          <div>
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
                  Short description of security deposit
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
                <div
                  class="s-relative s-flex s-items-center s-w-full sm:s-w-1/2"
                >
                  <input
                    v-model.number="formData.powerHour"
                    type="number"
                    name="name"
                    required
                    class="disabled:s-border-none disabled:s-ring-0 disabled:s-bg-[#f4f6ff] disabled:s-cursor-not-allowed s-pr-20 s-py-3.5 s-pl-[1.375rem] s-font-normal s-placeholder-[#8F8FB1] s-text-[#000] s-text-sm s-rounded-full s-border-none s-ring-1 s-ring-[#99A4E1] focus:s-bg-[#F1F3FF] focus:s-ring-primary-blue focus:s-ring-2 s-bg-[#FAFAFE] s-w-full focus:s-outline-none"
                    :class="[
                      //   {
                      //     's-ring-[#EA4335] focus:s-ring-[#EA4335] !s-pr-12':
                      //       error !== null && error.$error,
                      //   },
                    ]"
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
        <div
          class="border s-mt-auto s-flex s-justify-end md-s:s-hidden s-py-5 s-border-t s-border-solid s-fixed s-bottom-0 s-w-full s-pr-4 s-left-0 s-bg-white"
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
            :loading="loader"
            @submit="next"
          />
        </div>
      </div>
    </div>
  </div>
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
      loader: false,
      editMode: false,
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
    ...mapState('host/listing', ['propertyListingId', 'addDiscount']),
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
      this.editModeSetting()
    },
  },

  mounted() {
    this.getServiceCharge()
  },
  methods: {
    ...mapActions('host/listing', [
      'getListingDetail',
      'updateServiceCharge',
      'addServiceCharge',
    ]),
    validationMsg: validationMessage(formMessages),
    async getServiceCharge() {
      this.loading = true
      try {
        const response = await this.getListingDetail()
        this.loading = false
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
        this.loading = false
        this.$errorHandler(error)
      }
    },
    convertToNumber(str) {
      const newStr = str.replace(/\D/g, '')
      return Number(newStr)
    },
    back() {
      this.$router.push({
        name: 'host-listing-booking',
        query: { step: 2, level: this.addDiscount ? 3 : 2 },
      })
    },
    async next() {
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
        this.loader = true
        if (this.editMode) {
          try {
            const response = await this.updateServiceCharge(data)
            this.loader = false
            if (response.data.statusCode === 200) {
              this.services = response.data.data
              this.$router.push({
                name: 'host-listing-booking',
                query: { step: 2, level: 5 },
              })
            }
          } catch (error) {
            this.loader = false
            this.$errorHandler(error)
          }
        } else {
          try {
            const response = await this.addServiceCharge(data)
            this.loader = false
            if (response.data.statusCode === 201) {
              this.services = response.data.data
              this.$router.push({
                name: 'host-listing-booking',
                query: { step: 2, level: 5 },
              })
            }
          } catch (error) {
            this.loader = false
            this.$errorHandler(error)
          }
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
    editModeSetting() {
      if (!this.listingMaintenance) this.editMode = false
      else this.editMode = true
    },
  },
}
</script>
