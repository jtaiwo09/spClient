<template>
  <div>
    <Loading v-if="loader" />
    <div v-else class="md-s:!s-min-h-fit s-pb-[2.375rem]">
      <div
        class="s-mb-2 s-px-6 md-x:!s-px-[3.25rem] s-flex s-justify-between s-items-center s-sticky s-top-0 md-s:s-top-2.5 s-h-[100px] s-w-full s-bg-[#fff] s-z-[2]"
      >
        <div>
          <h2 class="title s-text-[1.25rem] s-mb-0">Identification</h2>
          <p class="sub-title !s-leading-[1.375rem] s-text-xs">
            Complete your personal information
          </p>
        </div>
        <div class="md-s:s-flex s-hidden">
          <Button
            :class="'s-mr-1.5 s-w-[7.875rem] s-border-2 s-border-solid s-border-primary-blue !s-text-primary-blue s-py-2.5 s-font-bold'"
            text="Back"
            @submit="back"
          />
          <Button
            :class="'s-w-[7.875rem] s-bg-primary-blue s-text-white s-py-2.5 s-font-bold'"
            text="Next"
            :loading="loading"
            @submit="next"
          />
        </div>
      </div>
      <div class="s-flex md-s:s-block s-flex-col">
        <div class="s-px-6 md-x:!s-px-[3.25rem]">
          <div
            class="s-flex s-flex-col s-w-full sm:s-flex-row sm:s-mb-2.5 sm:s-space-x-6 lg:s-space-x-8"
          >
            <TextField
              :class="'s-w-full'"
              label="First Name"
              placeholder="Enter First Name"
              type="text"
              name="firstName"
              :error="error && error.firstname"
              :validation-msg="validationMsg($v.formData.firstname)"
              :model-value="formData.firstname"
              @update:modelValue="(value) => (formData.firstname = value)"
            />
            <TextField
              :class="'s-w-full'"
              label="Last Name"
              placeholder="Enter Last Name"
              type="text"
              name="lastName"
              :error="error && error.lastname"
              :validation-msg="validationMsg($v.formData.lastname)"
              :model-value="formData.lastname"
              @update:modelValue="(value) => (formData.lastname = value)"
            />
          </div>
          <div
            class="s-flex s-flex-col s-w-full sm:s-flex-row sm:s-mb-2.5 sm:s-space-x-6 lg:s-space-x-8"
          >
            <PhoneNumber
              :class="'s-w-full'"
              label="Phone number"
              :country-code="formData.countryCode"
              :model-value="formData.phone"
              :error="error && error.phone"
              :validation-msg="validationMsg($v.formData.phone)"
              @update:modelValue="(value) => (formData.phone = value)"
              @updatePhone="getPhoneNumberInfo"
            />
            <Select
              :class="'sm:!s-mb-0 sm:s-w-full'"
              label="Gender"
              name="Gender"
              :options="selectGender"
              :value="formData.gender"
              :error="error && error.gender"
              :validation-msg="validationMsg($v.formData.gender)"
              @update="(value) => (formData.gender = value)"
            />
          </div>
          <div class="sm:s-w-1/2 sm:s-mr-8">
            <Date
              :class="'flex-1 s-w-full'"
              label="Date of Birth"
              :model-value="formData.dob"
              :error="error && error.dob"
              :validation-msg="validationMsg($v.formData.dob)"
              @update:modelValue="(value) => (formData.dob = value)"
            />
          </div>
          <section class="s-mt-8 s-w-full">
            <h2
              class="s-font-bold s-text-[1rem] s-leading-[1.375rem] s-mb-[1.375rem] s-text-[#222228]"
            >
              Complete your address
            </h2>
            <div class="sm:s-mb-2.5">
              <TextField
                :class="'s-w-full s-inline-block'"
                label="Full Address"
                placeholder="Enter your address"
                type="text"
                name="address"
                :model-value="formData.address"
                :error="error && error.address"
                :validation-msg="validationMsg($v.formData.address)"
                @update:modelValue="(value) => (formData.address = value)"
              />
            </div>
            <div
              class="s-flex s-flex-col s-w-full sm:s-flex-row sm:s-mb-2.5 sm:s-space-x-6 lg:s-space-x-8"
            >
              <TextField
                :class="'s-w-full sm:s-w-1/2'"
                label="Landmark"
                placeholder="Enter Landmark"
                type="text"
                name="landmark"
                :model-value="formData.landmark"
                :error="error && error.landmark"
                :validation-msg="validationMsg($v.formData.landmark)"
                @update:modelValue="(value) => (formData.landmark = value)"
              />
              <CountrySelectorPackage
                label="Select country"
                class="s-w-full sm:s-w-1/2"
                :value="formData.countryCode"
                :error="error && error.country"
                :validation-msg="validationMsg($v.formData.country)"
                @updateCountry="
                  (value) => (
                    (formData.country = value.name),
                    (formData.countryCode = value.isoCode)
                  )
                "
              />
            </div>
            <div>
              <StateSelectorPackage
                label="Select state"
                class="s-w-full sm:s-w-1/2"
                :country-code="formData.countryCode"
                :value="formData.state"
                :error="error && error.state"
                :validation-msg="validationMsg($v.formData.state)"
                @updateState="(value) => (formData.state = value.name)"
              />
            </div>
          </section>
        </div>
        <div
          class="s-z-50 border s-mt-auto s-flex s-justify-end md-s:s-hidden s-py-5 s-border-t s-border-solid sm:s-border-0 s-fixed s-bottom-0 s-w-full s-pr-4 s-left-0 s-bg-white"
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
import { mapActions, mapState } from 'vuex'
import { required } from 'vuelidate/lib/validators'
import { validationMessage } from 'vuelidate-messages'
import { formattedDate } from '../../../helpers/utils'

const formMessages = {
  firstnameRequired: () => 'First name is required',
  lastnameRequired: () => 'Last name is required',
  phoneRequired: () => 'Phone number is required',
  genderRequired: () => 'Gender is required',
  dobRequired: () => 'Date of birth is required',
  addressRequired: () => 'address is required',
  landmarkRequired: () => 'Landmark is required',
  countryRequired: () => 'Country is required',
  stateRequired: () => 'State is required',
}

export default {
  name: 'PersonalInformation',
  data() {
    return {
      formData: {
        firstname: '',
        lastname: '',
        phone: '',
        gender: '',
        dob: '',
        address: '',
        country: '',
        countryCode: '',
        landmark: '',
        state: '',
      },
      formattedPhoneNumber: '',
      error: null,
      loading: false,
    }
  },
  validations() {
    return {
      formData: {
        firstname: {
          firstnameRequired: required,
        },
        lastname: {
          lastnameRequired: required,
        },
        phone: {
          phoneRequired: required,
        },
        gender: {
          genderRequired: required,
        },
        dob: {
          dobRequired: required,
        },
        address: {
          addressRequired: required,
        },
        country: {
          countryRequired: required,
        },
        landmark: {
          landmarkRequired: required,
        },
        state: {
          stateRequired: required,
        },
      },
    }
  },
  computed: {
    ...mapState('host/listing', ['propertyListingId']),
    ...mapState('user', ['userData', 'loader']),
    selectGender() {
      return [
        { text: 'Male', value: 'Male' },
        { text: 'Female', value: 'Female' },
        { text: 'Other', value: 'Other' },
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
    ...mapActions('user', ['addDoc']),
    validationMsg: validationMessage(formMessages),
    getPhoneNumberInfo(inputValue) {
      this.formattedPhoneNumber = inputValue.formattedNumber
      this.formData.countryCode = inputValue.countryCode
    },
    formatPhone(str) {
      return str.replace(/\s/g, '')
    },
    formatDate(str) {
      return formattedDate(str)
    },
    async next() {
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.error = this.$v.formData
      } else {
        this.error = null
        this.loading = true
        const data = {
          ...this.formData,
          phone: this.formatPhone(this.formData.phone),
          dob: this.formatDate(this.formData.dob),
        }
        delete data.firstname
        delete data.lastname
        try {
          const response = await this.addDoc(data)
          this.loading = false
          if (response.data.statusCode === 200) {
            this.$router.push({
              name: 'host-listing-kyc',
              query: { step: 3, level: 2 },
            })
          }
        } catch (error) {
          this.loading = false
          this.$errorHandler(error)
        }
      }
    },
    back() {
      this.$router.push(
        `/host/listing/continue-listing?id=${this.propertyListingId}&next=true`
      )
      this.UPDATE_LEVEL(1)
      this.UPDATE_STEP(3)
    },
    updateForm() {
      if (this.userData && this.userData.kyc) {
        const {
          firstname,
          lastname,
          country,
          dob,
          landmark,
          state,
          phone,
          gender,
          address,
        } = this.userData.kyc
        this.formData.firstname = firstname
        this.formData.lastname = lastname
        this.formData.gender = gender
        this.formData.country = country
        this.formData.dob = dob
        this.formData.landmark = landmark
        this.formData.address = address
        this.formData.state = state
        this.formData.phone = phone
        this.formData.countryCode = 'NG'
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
