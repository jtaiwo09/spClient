<template>
  <div class="s-flex s-flex-col s-h-[90%] sm:s-h-full">
    <div>
      <div class="s-flex s-flex-col s-w-full sm:s-mr-8 sm:s-flex-row">
        <TextField
          :class="'s-mr-6 md:s-mr-8 s-w-full'"
          label="First Name"
          placeholder="Enter First Name"
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
          label="Last Name"
          placeholder="Enter Last Name"
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
          label="Email Address"
          placeholder="Enter your email address"
          type="email"
          icon="MessageIcon"
          name="email"
          :error="error && error.email"
          :validation-msg="validationMsg($v.formData.email)"
          :model-value="formData.email"
          @update:modelValue="(value) => (formData.email = value)"
        />
        <Date
          :class="'s-w-full'"
          label="Date of birth"
          :error="error && error.dob"
          :max-date="maxDate"
          :validation-msg="validationMsg($v.formData.dob)"
          :model-value="formData.dob"
          @update:modelValue="(value) => (formData.dob = value)"
        />
      </div>

      <div class="s-flex s-flex-col s-w-full sm:s-flex-row">
        <PhoneNumber
          :class="'s-mr-6 md:s-mr-8 s-w-full'"
          label="Phone number"
          :error="error && error.phone"
          :country-code="formData.countryCode"
          :validation-msg="validationMsg($v.formData.phone)"
          :model-value="formData.phone"
          @update:modelValue="(value) => (formData.phone = value)"
          @updatePhone="getPhoneNumberInfo"
        />
        <Select
          :class="'sm:!s-mb-0 sm:s-w-full'"
          label="Marital status"
          name="maritalStatus"
          icon="MemberIcon"
          :options="selectMaritalStatus"
          :error="error && error.maritalStatus"
          :validation-msg="validationMsg($v.formData.maritalStatus)"
          :value="formData.maritalStatus"
          @update="(value) => (formData.maritalStatus = value)"
        />
      </div>
    </div>
    <div class="s-flex s-justify-end s-mt-10 btn">
      <Button
        text="Go Back"
        :class="'s-mr-4 s-bg-white sm:s-border-2 sm:s-border-solid sm:s-border-primary-blue !s-text-primary-blue s-py-3 s-w-full sm:s-w-32'"
        @submit="decreaseStep"
      />
      <Button
        text="Continue"
        :class="'s-bg-primary-blue s-text-white s-py-3 s-w-full sm:s-w-32'"
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
import { format } from 'date-fns'

const formMessages = {
  firstnameRequired: () => 'Firstname is required',
  lastnameRequired: () => 'Lastname is required',
  dateRequired: () => 'Date of birth is required',
  phoneNoRequired: () => 'Phone number is required',
  maritalStatusRequired: () => 'Marital status is required',
  emailRequired: () => 'Email is required',
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
        maritalStatus: '',
        dob: '',
        countryCode: 'NG',
      },
      error: null,
      loading: false,
    }
  },
  validations: {
    formData: {
      firstName: {
        firstnameRequired: required,
      },
      lastName: {
        lastnameRequired: required,
      },
      email: {
        emailRequired: required,
        email,
      },
      phone: {
        phoneNoRequired: required,
      },
      maritalStatus: {
        maritalStatusRequired: required,
      },
      dob: {
        dateRequired: required,
      },
    },
  },
  computed: {
    ...mapState('renters/verify', ['currentStep', 'tenant']),
    selectMaritalStatus() {
      return [
        { text: 'Single', value: 'single' },
        { text: 'Married', value: 'married' },
      ]
    },
    formattedDate() {
      const formattedDate = format(this.formData.dob, 'yyyy-MM-dd')
      return formattedDate
    },
    maxDate() {
      const currentDate = new Date()
      return currentDate.setFullYear(currentDate.getFullYear() - 18)
    },
  },
  mounted() {
    if (this.tenant) {
      this.formData.firstName = this.tenant.firstName
      this.formData.lastName = this.tenant.lastName
      this.formData.email = this.tenant.email
      this.formData.phone = `+${this.tenant.phone}`
      this.formData.countryCode = this.tenant.countryCode
      this.formData.maritalStatus = this.tenant.maritalStatus
      this.formData.dob = new Date(this.tenant.dob)
    }
  },
  methods: {
    ...mapMutations('renters/verify', ['INCREMENT_STEP', 'DECREMENT_STEP']),
    ...mapActions('renters/verify', [
      'addPersonalDetails',
      'updatePersonalDetails',
    ]),
    getPhoneNumberInfo(inputValue) {
      this.formattedPhoneNumber = inputValue.formattedNumber
      this.formData.countryCode = inputValue.countryCode
    },
    validationMsg: validationMessage(formMessages),
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
          if (this.tenant === undefined) {
            try {
              const response = await this.addPersonalDetails({
                ...this.formData,
                dob: this.formattedDate,
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
              const response = await this.updatePersonalDetails({
                ...this.formData,
                dob: this.formattedDate,
                phone: this.formattedPhoneNumber.slice(1),
                id: this.tenant.id,
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
