<template>
  <div>
    <Loading v-if="loader" />
    <div v-else class="md-s:!s-min-h-fit s-pb-[2.375rem]">
      <div
        class="s-mb-2 s-px-6 md-x:!s-px-[3.25rem] s-flex s-justify-between s-items-center s-sticky s-top-0 md-s:s-top-2.5 s-h-[100px] s-w-full s-bg-[#fff] s-z-20"
      >
        <div>
          <h2 class="title s-text-[1.25rem] s-mb-0">Identification</h2>
          <p class="sub-title !s-leading-[1.375rem] s-text-xs">
            Company & Employer Information
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
          <div class="s-mb-[2.125rem]">
            <label
              class="s-text-[#222228] s-text-sm s-font-semibold s-block s-mb-3"
              >Are you listing as a company?</label
            >
            <div class="s-flex s-flex-wrap s-gap-1">
              <SelectButton
                name="Yes"
                :value="formData.listingAsCompany"
                text="Yes"
                :error="error && error.listingAsCompany"
                @submit="formData.listingAsCompany = 'Yes'"
              />
              <SelectButton
                name="No"
                :value="formData.listingAsCompany"
                text="No"
                :error="error && error.listingAsCompany"
                @submit="formData.listingAsCompany = 'No'"
              />
            </div>
            <FormFieldError
              :validation-msg="validationMsg($v.formData.listingAsCompany)"
            />
          </div>
          <transition>
            <div v-if="formData.listingAsCompany === 'Yes'">
              <div
                class="textfield-wrap s-mb-[1.375rem] sm:s-mb-0 sm:s-mr-5 md-x:!s-mr-[3.25rem] s-flex-1"
              >
                <label
                  class="s-text-[#222228] s-text-sm s-font-semibold s-block s-mb-3"
                  >Company Name</label
                >
                <TextField
                  :class="'s-w-full sm:s-w-1/2 !s-mb-0'"
                  placeholder="Enter name"
                  type="text"
                  name="companyName"
                  :error="error && error.companyName"
                  :validation-msg="validationMsg($v.formData.companyName)"
                  :model-value="formData.companyName"
                  @update:modelValue="(value) => (formData.companyName = value)"
                />
              </div>
              <section class="s-mt-8">
                <div class="s-mb-[1.375rem]">
                  <h2
                    class="s-font-bold s-text-[1rem] s-leading-[1.375rem] s-text-[#222228]"
                  >
                    Alternative Contact Details
                  </h2>
                  <p class="s-text-[#646466] s-text-xs s-leading-[1.375rem]">
                    This section is optional
                  </p>
                </div>
                <div class="s-flex s-flex-col sm:s-flex-row sm:s-mb-[2.125rem]">
                  <div
                    class="textfield-wrap s-mb-[1.375rem] sm:s-mb-0 sm:s-mr-5 md-x:!s-mr-[3.25rem] s-flex-1"
                  >
                    <label
                      class="s-text-[#222228] s-text-sm s-font-semibold s-block s-mb-3"
                      >First Name</label
                    >
                    <TextField
                      :class="'s-mr-6 md:s-mr-8 s-w-full !s-mb-0'"
                      placeholder="Enter first name"
                      type="text"
                      name="firstname"
                      :model-value="formData.firstname"
                      :error="error && error.firstname"
                      :validation-msg="validationMsg($v.formData.firstname)"
                      @update:modelValue="
                        (value) => (formData.firstname = value)
                      "
                    />
                  </div>
                  <div class="s-flex-1 s-mb-[1.375rem] sm:s-mb-0">
                    <label
                      class="s-text-[#222228] s-text-sm s-font-semibold s-block s-mb-3"
                      >Last Name</label
                    >
                    <TextField
                      :class="'s-mr-6 md:s-mr-8 s-w-full !s-mb-0'"
                      placeholder="Enter last name"
                      type="text"
                      name="lastname"
                      :model-value="formData.lastname"
                      :error="error && error.lastname"
                      :validation-msg="validationMsg($v.formData.lastname)"
                      @update:modelValue="
                        (value) => (formData.lastname = value)
                      "
                    />
                  </div>
                </div>
                <div class="s-flex s-flex-col sm:s-flex-row">
                  <div
                    class="textfield-wrap s-mb-[1.375rem] sm:s-mb-0 sm:s-mr-5 md-x:!s-mr-[3.25rem] s-flex-1"
                  >
                    <label
                      class="s-text-[#222228] s-text-sm s-font-semibold s-block s-mb-3"
                      >Phone Number</label
                    ><PhoneNumber
                      label=""
                      :class="'s-mr-6 md:s-mr-8 s-w-full !s-mb-0'"
                      :country-code="formData.countryCode"
                      :model-value="formData.phone"
                      :error="error && error.phone"
                      :validation-msg="validationMsg($v.formData.phone)"
                      @update:modelValue="(value) => (formData.phone = value)"
                      @updatePhone="getPhoneNumberInfo"
                    />
                  </div>
                  <div class="s-flex-1 s-mb-[1.375rem] sm:s-mb-0">
                    <label
                      class="s-text-[#222228] s-text-sm s-font-semibold s-block s-mb-3"
                      >Email Address</label
                    >
                    <TextField
                      :class="'s-mr-6 md:s-mr-8 s-w-full !s-mb-0'"
                      placeholder="Enter email address"
                      type="email"
                      name="email"
                      :model-value="formData.email"
                      :error="error && error.email"
                      :validation-msg="validationMsg($v.formData.email)"
                      @update:modelValue="(value) => (formData.email = value)"
                    />
                  </div>
                </div>
              </section>
            </div>
          </transition>
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
import { required, requiredIf, email } from 'vuelidate/lib/validators'
import { validationMessage } from 'vuelidate-messages'

const formMessages = {
  listingAsCompanyRequired: () => 'Please choose an option',
  companyNameRequired: () => 'Company name is required',
  firstnameRequired: () => 'First name is required',
  lastnameRequired: () => 'Last name is required',
  emailRequired: () => 'Email is required',
  email: () => 'Must be an email',
  phoneRequired: () => 'Phone number is required',
}

export default {
  data() {
    return {
      formData: {
        listingAsCompany: '',
        companyName: '',
        firstname: '',
        lastname: '',
        email: '',
        phone: '',
        countryCode: 'NG',
      },
      formattedPhoneNumber: '',
      error: null,
      loading: false,
    }
  },
  validations() {
    return {
      formData: {
        listingAsCompany: {
          listingAsCompanyRequired: required,
        },
        companyName: {
          companyNameRequired: requiredIf(() => {
            if (this.formData.listingAsCompany === 'Yes') return true
            else return false
          }),
        },
        firstname: {
          firstnameRequired: requiredIf(() => {
            if (this.formData.listingAsCompany === 'Yes') return true
            else return false
          }),
        },
        lastname: {
          lastnameRequired: requiredIf(() => {
            if (this.formData.listingAsCompany === 'Yes') return true
            else return false
          }),
        },
        email: {
          emailRequired: requiredIf(() => {
            if (this.formData.listingAsCompany === 'Yes') return true
            else return false
          }),
          email,
        },
        phone: {
          phoneRequired: requiredIf(() => {
            if (this.formData.listingAsCompany === 'Yes') return true
            else return false
          }),
        },
      },
    }
  },
  computed: {
    ...mapState('host/listing', ['propertyListingId']),
    ...mapState('user', ['userData', 'loader']),
  },
  watch: {
    userData: 'updateForm',
  },
  mounted() {
    this.updateForm()
  },
  methods: {
    ...mapActions('user', ['userAlternativeContact']),
    validationMsg: validationMessage(formMessages),
    getPhoneNumberInfo(inputValue) {
      this.formattedPhoneNumber = inputValue.formattedNumber
      this.formData.countryCode = inputValue.countryCode
    },
    formatPhone(str) {
      return str.replace(/\s/g, '')
    },
    async next() {
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.error = this.$v.formData
      } else {
        const data = {
          ...this.formData,
          phone: this.formatPhone(this.formData.phone),
          listingAsCompany: this.formData.listingAsCompany === 'Yes',
        }
        if (this.formData.listingAsCompany === 'Yes') {
          this.loading = true
          try {
            const response = await this.userAlternativeContact(data)
            this.loading = false
            if (response.data.statusCode === 200) {
              this.$router.push({
                name: 'host-listing-kyc',
                query: { step: 3, level: 3 },
              })
            }
          } catch (error) {
            this.loading = false
            this.$errorHandler(error)
          }
        } else {
          this.$router.push({
            name: 'host-listing-kyc',
            query: { step: 3, level: 3 },
          })
        }
      }
    },
    back() {
      this.$router.push({
        name: 'host-listing-kyc',
        query: { step: 3, level: 1 },
      })
    },
    updateForm() {
      if (this.userData && this.userData.alternativeContact) {
        const { companyName, firstname, lastname, phone, email, countryCode } =
          this.userData.alternativeContact
        this.formData.listingAsCompany = 'Yes'
        this.formData.companyName = companyName
        this.formData.firstname = firstname
        this.formData.lastname = lastname
        this.formData.phone = phone
        this.formData.email = email
        this.formData.countryCode = countryCode
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.v-enter-active,
.v-leave-active {
  transition: all 0.5s ease;
}

.v-enter,
.v-leave-to {
  opacity: 0;
  transform: translateX(-50px);
}
</style>
