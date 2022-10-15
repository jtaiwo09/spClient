<template>
  <div class="s-flex s-flex-col s-h-[90%] sm:s-h-full">
    <div class="s-max-w-[40rem] s-mx-5 s-mt-4">

      <div class="s-flex s-flex-col s-w-full sm:s-flex-row s-gap-0 sm:s-gap-7">
        <TextField
          class="s-w-full sm:s-w-1/2"
          label="First Name"
          placeholder="Enter First Name"
          type="text"
          name="firstname"
          :error="error && error.firstname"
          :validation-msg="validationMsg($v.formData.firstname)"
          :model-value="formData.firstname"
          @update:modelValue="(value) => (formData.firstname = value)"
        />
        <TextField
          class="s-w-full sm:s-w-1/2"
          label="Last Name"
          placeholder="Enter Last Name"
          type="text"
          name="lastname"
          :error="error && error.lastname"
          :validation-msg="validationMsg($v.formData.lastname)"
          :model-value="formData.lastname"
          @update:modelValue="(value) => (formData.lastname = value)"
        />
      </div>

      <div class="s-flex s-flex-col s-w-full sm:s-flex-row s-gap-0 sm:s-gap-7">
        <PhoneNumber
        class="s-w-full sm:s-w-1/2"
          label="Phone number"
          :country-code="formData.countryCode"
          :model-value="formData.phone"
          :error="error && error.phone"
          :validation-msg="validationMsg($v.formData.phone)"
          @update:modelValue="(value) => (formData.phone = value)"
          @updatePhone="getPhoneNumberInfo"
        />
        <TextField
          class="s-w-full sm:s-w-1/2"
          label="Email"
          placeholder="Enter Email Address"
          type="text"
          name="email"
          :error="error && error.email"
          :validation-msg="validationMsg($v.formData.email)"
          :model-value="formData.email"
          @update:modelValue="(value) => (formData.email = value)"
        />
      </div>

      <div class="s-flex s-flex-col s-w-full sm:s-flex-row s-gap-0 sm:s-gap-7">
        <TextField
          class="s-w-full sm:s-w-1/2"
          label="GUARANTOR OCCUPATION"
          placeholder="Enter occupation"
          type="text"
          name="occupation"
          :error="error && error.occupation"
          :validation-msg="validationMsg($v.formData.occupation)"
          :model-value="formData.occupation"
          @update:modelValue="(value) => (formData.occupation = value)"
        />
        <TextField
          class="s-w-full sm:s-w-1/2"
          label="GUARANTOR OFFICE ADDRESS"
          placeholder="Enter Address"
          type="text"
          name="officeAddress"
          :error="error && error.officeAddress"
          :validation-msg="validationMsg($v.formData.officeAddress)"
          :model-value="formData.officeAddress"
          @update:modelValue="(value) => (formData.officeAddress = value)"
        />
      </div>

      <div class="s-flex s-flex-col s-w-full sm:s-flex-row s-mt-5">
        <TextField
          class="s-w-full sm:s-w-2/2"
          label="GUARANTOR’S HOME ADDRESS"
          placeholder="Enter your Address"
          type="text"
          name="address"
          :error="error && error.address"
          :validation-msg="validationMsg($v.formData.address)"
          :model-value="formData.address"
          @update:modelValue="(value) => (formData.address = value)"
        />
      </div>
    </div>



    <div class="s-flex s-justify-end s-mt-10 btn s-mx-10">
      <Button
        text="Save Changes"
        :class="'s-bg-primary-blue s-text-white s-py-3 s-px-5'"
        :loading="loading"
        @submit="updateProfile"
      />
    </div>
  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
import { validationMessage } from 'vuelidate-messages'
import { mapActions, mapState } from 'vuex'

const formMessages = {
  firstNameRequired: () => 'First Name is required',
  lastNameRequired: () => 'Last Name is required',
  phoneRequired: () => 'Phone number is required',
  emailRequired: () => 'Email is required',
  addressRequired: () => 'Home address is required',
  occupationRequired: () => 'Occupation is required',
  officeAddressRequired: () => 'Office Address is required'
}
export default {
  name: 'Profile',
  data() {
    return {
      formData: {
        firstname: '',
        lastname: '',
        phone: '',
        email: '',
        countryCode: '',
        address: '',
        occupation: '',
        officeAddress: ''
      },
      formattedPhoneNumber: '',
      isListingCompany: '',
      error: null,
      loading: false,
    }
  },
  validations() {
    return {
      formData: {
        firstname: {
          firstNameRequired: required,
        },
        lastname: {
          lastNameRequired: required,
        },
        phone: {
          phoneRequired: required,
        },
        email: {
          emailRequired: required,
        },
        address: {
          addressRequired: required
        },
        occupation: {
          occupationRequired: required
        },
        officeAddress: {
          officeAddressRequired: required
        }
      },
    }
  },
  computed: {
    ...mapState('user', ['userData', 'loader']),
    selectRelation() {
      return [
        { text: 'Mother', value: 'Mother' },
        { text: 'Father', value: 'Father' },
        { text: 'Wife', value: 'Wife' },
        { text: 'Husband', value: 'Husband' },
        { text: 'Daughter', value: 'Daughter' },
        { text: 'Son', value: 'Son' },
        { text: 'Sister', value: 'Sister' },
        { text: 'Brother', value: 'Brother' },
        { text: 'Friend', value: 'Friend' },
        { text: 'Aunty', value: 'Aunty' },
        { text: 'Uncle', value: 'Uncle' },
        { text: 'Cousin', value: 'Cousin' },
        { text: 'Nephew', value: 'Nephew' }
      ]
    },
  },
  watch: {
    userData: 'updateForm',
  },
  mounted() {
    this.updateForm()
  },
  methods: {
    ...mapActions('user', ['updateGuarantorInfo']),
    validationMsg: validationMessage(formMessages),
    scrolltoTop() {
      window.scrollTo(0, 0)
    },
    getPhoneNumberInfo(inputValue) {
      this.formattedPhoneNumber = inputValue.formattedNumber
      this.formData.countryCode = inputValue.countryCode
    },
    formatPhone(str) {
      return str.replace(/\s/g, '')
    },


    updateForm() {
      this.formData.countryCode = 'NG'
      this.isListingCompany = 'yes'

      if (this.userData && this.userData.guarantor) {
        const {
          email,
          firstname,
          lastname,
          phone,
          occupation,
          address,
          officeAddress
        } = this.userData.guarantor;
        this.formData.email = email
        this.formData.firstname = firstname
        this.formData.lastname = lastname
        this.formData.phone = phone
        this.formData.occupation = occupation
        this.formData.officeAddress = officeAddress
        this.formData.address = address
      }
    },

    async updateProfile() {
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.error = this.$v.formData
      } else {
        this.error = null
        this.loading = true
        const data = {
          ...this.formData,
          phone: this.formatPhone(this.formData.phone),
        }
        try {
          const response = await this.updateGuarantorInfo(data)
          this.loading = false
          if (response.data.statusCode === 200) {
           this.$showToast(response.data.message, 'success')
          }
        } catch (error) {
          this.loading = false
          this.$errorHandler(error)
        }
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
