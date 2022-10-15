<template>
  <div class="s-flex s-flex-col s-h-[90%] sm:s-h-full">
    <div class="s-max-w-[40rem] s-mx-5 s-mt-4">

      <div class="s-flex s-flex-col s-w-full sm:s-flex-row s-gap-0 sm:s-gap-7 s-mb-8">
        <div class="md:s-w-[480px]">
          <h3>Notifications related to you and your space</h3>
          <p class="s-text-[#4B4F63] s-text-[14px]">Space, booking, payment and other notifications related to your space.</p>
        </div>
        <div>
          <Toggle :is-toggled="false" :show-text="false" />
        </div>
      </div>

      <div class="s-flex s-flex-col s-w-full sm:s-flex-row s-gap-0 sm:s-gap-7 s-mb-8">
        <div class="md:s-w-[480px]">
          <h3>Updates, tips and recommendations</h3>
          <p class="s-text-[#4B4F63] s-text-[14px]">Periodic product updates and tips to optimise your hosting experience.</p>
        </div>
        <div>
          <Toggle :is-toggled="false" :show-text="false" />
        </div>
      </div>

      <div class="s-flex s-flex-col s-w-full sm:s-flex-row s-gap-0 sm:s-gap-7 s-mb-5">
        <div class="md:s-w-[480px]">
          <h3>Marketing and promotional updates</h3>
          <p class="s-text-[#4B4F63] s-text-[14px]">Newsletters updates, surveys, vendor services and promotions.</p>
        </div>
        <div>
          <Toggle :is-toggled="false" :show-text="false" />
        </div>
      </div>

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
        { text: 'Sister', value: 'Sister' },
        { text: 'Brother', value: 'Brother' },
        { text: 'Aunty', value: 'Aunty' },
        { text: 'Uncle', value: 'Uncle' },
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
          officeAddress
        } = this.userData.guarantor;
        this.formData.email = email
        this.formData.firstname = firstname
        this.formData.lastname = lastname
        this.formData.phone = phone
        this.formData.occupation = occupation
        this.formData.officeAddress = officeAddress
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
