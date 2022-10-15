<template>
  <div class="s-flex s-flex-col s-h-[90%] sm:s-h-full">
    <div>
      <div class="s-flex s-flex-col s-w-full sm:s-mr-8 sm:s-flex-row">
        <TextField
          :class="'s-mr-6 md:s-mr-8 s-w-full'"
          label="First name"
          placeholder="Enter next of kin first name"
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
          placeholder="Enter next of kin last name"
          type="text"
          icon="UserIcon"
          name="lastName"
          :error="error && error.lastName"
          :validation-msg="validationMsg($v.formData.lastName)"
          :model-value="formData.lastName"
          @update:modelValue="(value) => (formData.lastName = value)"
        />
      </div>
      <div class="s-flex s-flex-col s-w-full sm:s-flex-row">
        <TextField
          :class="'s-mr-6 md:s-mr-8 s-w-full'"
          label="Next of kin's email"
          placeholder="Enter Email Address"
          type="email"
          icon="MessageIcon"
          name="email"
          :error="error && error.email"
          :validation-msg="validationMsg($v.formData.email)"
          :model-value="formData.email"
          @update:modelValue="(value) => (formData.email = value)"
        />
        <PhoneNumber
          label="Phone number"
          :error="error && error.phone"
          :country-code="formData.countryCode"
          :validation-msg="validationMsg($v.formData.phone)"
          :model-value="formData.phone"
          @update:modelValue="(value) => (formData.phone = value)"
          @updatePhone="getPhoneNumberInfo"
        />
      </div>
      <div class="s-flex s-flex-col s-w-full sm:s-flex-row">
        <TextField
          :class="'sm:s-w-[48%] s-mr-8 s-w-full s-mb-0'"
          label="Relationship"
          placeholder="Relationship With Next Of Kin"
          type="text"
          icon="UserIcon"
          name="relationship"
          :error="error && error.relationship"
          :validation-msg="validationMsg($v.formData.relationship)"
          :model-value="formData.relationship"
          @update:modelValue="(value) => (formData.relationship = value)"
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
import { required, email } from 'vuelidate/lib/validators'
import { mapMutations, mapState, mapActions } from 'vuex'
import { validationMessage } from 'vuelidate-messages'

const formMessages = {
  firstNameRequired: () => 'Next of kin firstname is required',
  lastNameRequired: () => 'Next of kin lastname is required',
  emailRequired: () => 'Next of kin email is required',
  phoneRequired: () => 'Next of kin phone number is required',
  relationshipRequired: () => 'Relationship with next of kin',
  email: () => 'Must be a valid email',
}
export default {
  data() {
    return {
      formattedPhoneNumber: '',
      formData: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        relationship: '',
        countryCode: 'NG',
      },
      error: null,
      loading: false,
    }
  },
  validations: {
    formData: {
      firstName: {
        firstNameRequired: required,
      },
      lastName: {
        lastNameRequired: required,
      },
      email: {
        emailRequired: required,
        email,
      },
      phone: {
        phoneRequired: required,
      },
      relationship: {
        relationshipRequired: required,
      },
    },
  },
  computed: {
    ...mapState('renters/verify', ['currentStep', 'tenant', 'nextOfKin']),
  },
  mounted() {
    if (this.nextOfKin) {
      this.formData.firstName = this.nextOfKin.firstName
      this.formData.lastName = this.nextOfKin.lastName
      this.formData.email = this.nextOfKin.email
      this.formData.phone = `+${this.nextOfKin.phone}`
      this.formData.relationship = this.nextOfKin.relationship
      this.formData.countryCode = this.nextOfKin.countryCode
    }
  },
  methods: {
    ...mapMutations('renters/verify', ['INCREMENT_STEP', 'DECREMENT_STEP']),
    ...mapActions('renters/verify', ['addNextOfKin', 'updateNextOfKin']),
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
          if (this.nextOfKin === undefined) {
            try {
              const response = await this.addNextOfKin({
                ...this.formData,
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
            try {
              const response = await this.updateNextOfKin({
                ...this.formData,
                id: this.nextOfKin.id,
                phone: this.formattedPhoneNumber.slice(1),
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
