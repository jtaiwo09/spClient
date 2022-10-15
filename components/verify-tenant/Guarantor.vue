<template>
  <div class="s-flex s-flex-col s-h-[90%] sm:s-h-full">
    <div>
      <div class="s-flex s-flex-col s-w-full sm:s-mr-8 sm:s-flex-row">
        <TextField
          :class="'s-mr-6 md:s-mr-8 s-w-full'"
          label="First name"
          placeholder="Enter guarantor’s first name"
          type="text"
          icon="UserIcon"
          name="firstName"
          :error="error && error.firstName"
          :validation-msg="validationMsg($v.formData.firstName)"
          :model-value="formData.firstName"
          @update:modelValue="(value) => (formData.firstName = value)"
        />
        <TextField
          :class="'s-w-full'"
          label="Last name"
          placeholder="Enter guarantor’s last name"
          type="text"
          icon="UserIcon"
          name="lastName"
          :error="error && error.lastName"
          :validation-msg="validationMsg($v.formData.lastName)"
          :model-value="formData.lastName"
          @update:modelValue="(value) => (formData.lastName = value)"
        />
      </div>
      <div class="s-flex s-flex-col s-w-full sm:s-mr-8 sm:s-flex-row">
        <PhoneNumber
          :class="'s-mr-6 md:s-mr-8 s-w-full'"
          label="Phone number"
          :country-code="formData.countryCode"
          :error="error && error.phone"
          :validation-msg="validationMsg($v.formData.phone)"
          :model-value="formData.phone"
          @update:modelValue="(value) => (formData.phone = value)"
          @updatePhone="getPhoneNumberInfo"
        />
        <TextField
          :class="'s-w-full'"
          label="Guarantor’s address"
          placeholder="Enter guarantor’s address"
          type="text"
          icon="LocationIcon"
          name="address"
          :error="error && error.address"
          :validation-msg="validationMsg($v.formData.address)"
          :model-value="formData.address"
          @update:modelValue="(value) => (formData.address = value)"
        />
      </div>
      <div class="s-flex s-flex-col s-w-full sm:s-flex-row">
        <Select
          :class="'s-mr-6 md:s-mr-8 s-w-full'"
          label="Employment status"
          name="employmentStatus"
          icon="WorkIcon"
          :options="selectEmployment"
          :error="error && error.employmentStatus"
          :validation-msg="validationMsg($v.formData.employmentStatus)"
          :value="formData.employmentStatus"
          @update="(value) => (formData.employmentStatus = value)"
        />

        <TextField
          :class="'s-w-full'"
          label="Company"
          placeholder="Enter guarantor’s company name"
          type="text"
          icon="WorkIcon"
          name="company"
          :disabled="
            formData.employmentStatus === 'unemployed' ||
            formData.employmentStatus === 'student'
          "
          :error="error && error.company"
          :validation-msg="validationMsg($v.formData.company)"
          :model-value="formData.company"
          @update:modelValue="(value) => (formData.company = value)"
        />
      </div>
    </div>
    <div class="s-flex s-justify-end s-mt-10 btn">
      <Button
        text="Go Back"
        :class="'s-mr-4 s-bg-[#fff] sm:s-border-2 sm:s-border-solid sm:s-border-primary-blue !s-text-primary-blue s-py-3 s-w-full sm:s-w-32'"
        @submit="decreaseStep"
      />
      <Button
        text="Continue"
        :class="'s-bg-primary-blue s-text-[#fff] s-py-3 s-w-full sm:s-w-32'"
        :loading="loading"
        @submit="increaseStep"
      />
    </div>
  </div>
</template>

<script>
import { required, requiredIf } from 'vuelidate/lib/validators'
import { mapMutations, mapState, mapActions } from 'vuex'
import { validationMessage } from 'vuelidate-messages'

const formMessages = {
  firstNameRequired: () => "Gurantor's firstname is required",
  lastNameRequired: () => "Gurantor's lastname is required",
  phoneRequired: () => "Gurantor's phone number is required",
  addressRequired: () => "Gurantor's address is required",
  employmentStatusRequired: () => "Gurantor's employment status is required",
  companyRequired: () => "Gurantor's company's name is required",
}
export default {
  props: {
    selectEmployment: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      formattedPhoneNumber: '',
      formData: {
        firstName: '',
        lastName: '',
        phone: '',
        address: '',
        employmentStatus: '',
        company: '',
        countryCode: 'NG',
      },
      error: null,
      loading: false,
    }
  },
  validations() {
    return {
      formData: {
        firstName: {
          firstNameRequired: required,
        },
        lastName: {
          lastNameRequired: required,
        },
        phone: {
          phoneRequired: required,
        },
        address: {
          addressRequired: required,
        },
        employmentStatus: {
          employmentStatusRequired: required,
        },
        company: {
          companyRequired: requiredIf(() => {
            if (
              this.formData.employmentStatus === 'unemployed' ||
              this.formData.employmentStatus === 'student'
            )
              return false
            else return true
          }),
        },
      },
    }
  },
  computed: {
    ...mapState('renters/verify', [
      'currentStep',
      'tenant',
      'guarantorDetails',
    ]),
    checkPayloadSent() {
      let data
      if (
        this.formData.employmentStatus === 'student' ||
        this.formData.employmentStatus === 'unemployed'
      ) {
        const { company, ...others } = this.formData
        data = { ...others }
      } else {
        data = this.formData
      }
      return data
    },
  },
  mounted() {
    if (this.guarantorDetails) {
      this.formData.firstName = this.guarantorDetails.firstName
      this.formData.lastName = this.guarantorDetails.lastName
      this.formData.phone = `+${this.guarantorDetails.phone}`
      this.formData.address = this.guarantorDetails.address
      this.formData.employmentStatus = this.guarantorDetails.employmentStatus
      this.formData.company = this.guarantorDetails.company
      this.formData.countryCode = this.guarantorDetails.countryCode
    }
  },
  methods: {
    ...mapMutations('renters/verify', ['INCREMENT_STEP', 'DECREMENT_STEP']),
    ...mapActions('renters/verify', ['addGuarantor', 'updateGuarantor']),
    validationMsg: validationMessage(formMessages),
    getPhoneNumberInfo(inputValue) {
      this.formattedPhoneNumber = inputValue.formattedNumber
      this.formData.countryCode = inputValue.countryCode
    },
    scrolltoTop() {
      window.scrollTo(0, 0)
    },
    async increaseStep() {
      if (this.currentStep < 5) {
        this.$v.$touch()
        if (this.$v.$invalid) {
          this.error = this.$v.formData
        } else {
          this.error = null
          this.loading = true
          if (this.guarantorDetails === undefined) {
            const data = this.checkPayloadSent
            try {
              const response = await this.addGuarantor({
                ...data,
                tenantId: this.tenant.id,
                phone: this.formattedPhoneNumber.slice(1),
              })
              if (response.data.statusCode === 201) {
                this.loading = false
                this.INCREMENT_STEP()
                this.scrolltoTop()
              }
            } catch (error) {
              this.loading = false
              this.$errorHandler(error)
            }
          } else {
            const data = this.checkPayloadSent
            try {
              const response = await this.updateGuarantor({
                ...data,
                phone: this.formattedPhoneNumber.slice(1),
                id: this.guarantorDetails.id,
              })
              if (response.data.statusCode === 200) {
                this.loading = false
                this.INCREMENT_STEP()
                this.scrolltoTop()
              }
            } catch (error) {
              this.loading = false
              this.$errorHandler(error)
            }
          }
        }
      }
    },
    decreaseStep() {
      if (this.currentStep > 1) {
        this.error = null
        this.DECREMENT_STEP()
        this.scrolltoTop()
      }
    },
  },
}
</script>

<style></style>
