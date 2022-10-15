<template>
  <div>
    <DashboardNavbar :show-back-btn="true" />
    <div
      v-show="
        Object.keys(verifications).length === 0 ||
        verifications.verificationRemaining === 0
      "
      class="lg:s-ml-[51px] lg:s-mr-[4.938rem] s-mx-4"
    >
      <Notice :title="'You’ve run out of verification units. '">
        <button
          class="hover:s-underline s-underline hover:s-text-[#2E48DA] s-text-[#2E48DA]"
          @click="displayNoticeModal = true"
        >
          Click here to buy more or subscribe to a plan
        </button>
      </Notice>
      <Modal :show="displayNoticeModal" @close="closeNoticeDialog">
        <div class="s-mt-6">
          <h1 class="s-text-xl s-leading-6 s-text-[#0E0C0C] s-font-bold s-pb-1">
            Choose a payment plan
          </h1>
          <p class="s-text-sm s-leading-6 s-text-[#63687E] s-font-normal">
            Pay for verification
          </p>
        </div>
        <form>
          <!-- <div class="s-my-6 s-flex">
            <input
              id="one time"
              v-model="verificationPaymentOption"
              class="s-mr-2 s-mt-1"
              type="radio"
              value="one time"
            />
            <label for="one time">
              <div>
                <h1
                  class="s-text-sm s-leading-5 s-text-[#374151] s-font-bold s-pb-2"
                >
                  One Time Payment
                </h1>
                <p
                  class="s-text-xs s-leading-4 s-text-[#63687E] s-font-normal s-min-w-[239px]"
                >
                  Little description on what one time payment is.
                </p>
              </div>
            </label>
          </div> -->
          <!-- <label for="subscription">
              <h1
                class="s-text-sm s-leading-5 s-text-[#374151] s-font-bold s-pb-2 s-ml-5"
              >
                Choose a Subcription plan
              </h1>
            </label> -->
          <Select
            :class="'s-mr-6 md:s-mr-8 s-w-full s-capitalize'"
            label=""
            name="status"
            icon=""
            :options="subscriptionPlan"
            :value="formData.paymentOption"
            @update="(value) => (formData.paymentOption = value)"
          />
          <hr class="s-my-6" />
          <div class="s-mb-[3.5rem]">
            <p
              class="s-uppercase s-font-bold s-text-xs s-text-[#242428] s-mb-5"
            >
              Choose Your Payment Option
            </p>
            <flutterwave-pay-button
              ref="flutterwave"
              :tx_ref="generateReference()"
              :amount="amount"
              currency="NGN"
              payment_options="card,ussd,banktransfer"
              redirect_url=""
              class="s-hidden"
              style=""
              :meta="metaData"
              :customer="{
                name: userFullname,
                email: userEmail,
                phone_number: userPhoneNumber,
              }"
              :customizations="{
                title: 'Payment Title',
                description: 'Payment for Verification',
                logo: 'https://res.cloudinary.com/spleetng/image/upload/v1611148920/logo-icon.svg',
              }"
              :callback="makePaymentCallback"
              :onclose="closedPaymentModal"
            >
              Click To Pay
            </flutterwave-pay-button>
            <div class="s-mb-4">
              <input
                id="flutterwave"
                v-model="selectedPaymentOption"
                type="radio"
                value="flutterwave"
              />
              <label for="flutterwave" class="s-ml-2">
                <img
                  src="@/assets/images/flutterwave.svg"
                  alt="flutterwave"
                  class="s-inline-block s-cursor-pointer"
                />
              </label>
            </div>
            <div>
              <input
                id="paystack"
                v-model="selectedPaymentOption"
                type="radio"
                value="paystack"
              />
              <label for="paystack" class="s-ml-3.5">
                <img
                  src="@/assets/images/paystack.svg"
                  alt="paystack"
                  class="s-inline-block s-cursor-pointer"
                />
              </label>
            </div>
          </div>
        </form>
        <div class="s-mt-8">
          <Button
            :disabled="fillAll"
            text="Make payment"
            :loading="noticeLoadingState"
            class="s-bg-primary-blue s-text-sm s-leading-[18px] s-text-white s-font-bold sm:s-px-10 s-w-full sm:s-w-[180px] s-mr-2 s-rounded-full sm:!s-py-[15px] s-py-[11px]"
            :class="[{ 's-bg-[#2E48DA]/60': fillAll }]"
            @submit="paySubscription"
          />
        </div>
      </Modal>
    </div>
    <div
      class="s-bg-white s-rounded-lg lg:s-ml-[51px] lg:s-mr-[4.938rem] s-mx-4 s-pb-[1.313rem] s-mb-10"
      :class="verifications < 1 ? 's-rounded-t-none' : ''"
    >
      <div class="s-pt-[3.563rem]">
        <div class="lg:s-pl-[90px] s-px-[27px]">
          <h1 class="s-text-xl s-leading-6 s-mb-[0.313rem] s-font-bold">
            Create Verification Request
          </h1>
          <p class="s-text-sm s-leading-[1.438rem] s-text-[#63687E]">
            Please enter details about your tenant below so we can help you
            verify details about them
          </p>
        </div>
        <div class="s-mt-[2.625rem]">
          <form>
            <div class="lg:s-pl-[90px] s-px-[27px]">
              <div
                class="create-breakpoint s-grid s-gap-6 s-mb-[34px] lg:s-grid-cols-3 md-x:s-grid-cols-2 md:s-grid-cols-1 s-grid-cols-1"
              >
                <TextField
                  :model-value="formData.firstName"
                  label="First name"
                  placeholder="Enter Tenant’s First Name"
                  type="text"
                  icon="UserIcon"
                  name="firstName"
                  class="!s-mb-0"
                  :error="error && error.formData.firstName"
                  :validation-msg="validationMsg($v.formData.firstName)"
                  @update:modelValue="(value) => (formData.firstName = value)"
                />
                <TextField
                  :model-value="formData.lastName"
                  :class="'s-w-full'"
                  label="Last name"
                  placeholder="Enter Tenant’s Last Name"
                  type="text"
                  class="!s-mb-0"
                  icon="UserIcon"
                  :error="error && error.formData.lastName"
                  :validation-msg="validationMsg($v.formData.lastName)"
                  name="lastName"
                  @update:modelValue="(value) => (formData.lastName = value)"
                />
              </div>
              <div
                class="create-breakpoint s-grid s-gap-6 s-mb-[34px] lg:s-grid-cols-3 md-x:s-grid-cols-2 md:s-grid-cols-1 s-grid-cols-1"
              >
                <TextField
                  :model-value="formData.email"
                  :class="'s-mr-8 s-w-full'"
                  label="Email address"
                  placeholder="Enter Tenant’s Email Address"
                  type="email"
                  icon="MessageIcon"
                  class="!s-mb-0"
                  name="email"
                  :error="error && error.formData.email"
                  :validation-msg="validationMsg($v.formData.email)"
                  @update:modelValue="(value) => (formData.email = value)"
                />
                <PhoneNumber
                  label="TENANT’S PHONE NUMBER"
                  :error="error && error.formData.phone"
                  class="!s-mb-0"
                  :validation-msg="validationMsg($v.formData.phone)"
                  :model-value="formData.phone"
                  :country-code="formData.countryCode"
                  @update:modelValue="(value) => (formData.phone = value)"
                  @updatePhone="getPhoneNumberInfo"
                />
              </div>
              <div
                class="create-breakpoint s-grid s-gap-6 s-mb-[34px] lg:s-grid-cols-3 md-x:s-grid-cols-2 md:s-grid-cols-1 s-grid-cols-1"
              >
                <TextField
                  :model-value="formData.displayName"
                  :class="''"
                  class="!s-mb-0"
                  label="Display name"
                  placeholder="Enter Your Display Name"
                  type="text"
                  icon="UserIcon"
                  :error="error && error.formData.displayName"
                  :validation-msg="validationMsg($v.formData.displayName)"
                  name="firstName"
                  @update:modelValue="(value) => (formData.displayName = value)"
                />
              </div>
              <div class="s-mb-[34px] s-grid s-grid-cols-1 s-max-w-[640px]">
                <p
                  class="s-px-[0.938rem] s-py-1 s-text-[0.781rem] s-text-[#706D9D] display__bg"
                >
                  Display name is the name the tenant sees is requesting their
                  verification
                </p>
              </div>
              <div class="s-mt-8">
                <p class="s-text-[#242428] s-text-xs s-font-bold">You have</p>
                <p class="s-mt-3 s-text-[1.375rem] s-font-semibold">
                  {{
                    Object.keys(verifications).length === 0
                      ? 0
                      : verifications.verificationRemaining
                  }}
                  verification units left
                </p>
                <button
                  v-if="
                    Object.keys(verifications).length === 0 ||
                    verifications.verificationRemaining === 0
                  "
                  type="button"
                  class="s-text-sm s-leading-6 hover:s-text-[#2E48DA] s-text-[#2E48DA]"
                  @click="submitForm"
                >
                  Add Subscription
                </button>
                <!-- <button
                  v-else
                  class="s-text-sm s-leading-6 hover:s-text-[#2E48DA] s-text-[#2E48DA]"
                >
                  Manage Subscription
                </button> -->
              </div>
            </div>
            <hr class="s-mt-[1.581rem] s-mb-[1.169rem]" />
            <div class="s-mr-[4.938rem] lg:s-pl-[90px] s-pl-[27px] s-w-full">
              <p class="s-text-sm s-leading-6 s-text-[#63687E]">
                By submitting this tenant verification request, You agree with
                our
                <span class="s-text-primary-blue s-font-bold"
                  >Terms and Conditions</span
                >
              </p>

              <button
                class="s-bg-primary-blue s-px-10 s-py-[11px] s-rounded-full s-text-white s-text-sm s-mt-5"
                type="button"
                @click="submitForm"
              >
                Submit Request
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <Modal :show="showModal" @close="closeModal">
      <div>
        <p
          class="s-pt-4 s-pb-2 sm:s-text-xl s-text-lg s-font-bold s-leading-6 s-whitespace-nowrap"
        >
          Confirm tenant information
        </p>
        <p
          class="s-pb-4 s-text-sm s-font-normal s-leading-6 s-text-[#3f3d56] s-text-[#63687E]"
        >
          Please confirm that the details of the tenant is correct
        </p>
        <div class="s-mb-6 s-grid s-gap-6 md:s-grid-cols-2 sm:s-grid-cols-1">
          <div>
            <p class="s-text-sm s-font-bold">FIRST NAME</p>
            <p
              class="s-text-sm s-leading-6 s-text-[#63687E] s-whitespace-normal s-break-words"
            >
              {{ formData.firstName }}
            </p>
          </div>
          <div class="">
            <p class="s-text-sm s-font-bold">LAST NAME</p>
            <p
              class="s-text-sm s-leading-6 s-text-[#63687E] s-whitespace-normal s-break-words"
            >
              {{ formData.lastName }}
            </p>
          </div>
        </div>
        <div
          class="s-grid s-gap-6 s-mb-[34px] md:s-grid-cols-2 sm:s-grid-cols-1"
        >
          <div>
            <p class="s-text-sm s-font-bold">EMAIL ADDRESS</p>
            <p
              class="s-text-sm s-leading-6 s-text-[#63687E] s-whitespace-normal s-break-words"
            >
              {{ formData.email }}
            </p>
          </div>
          <div>
            <p class="s-text-sm s-font-bold s-whitespace-nowrap">
              TENANT’S PHONE NUMBER
            </p>
            <p
              class="s-text-sm s-leading-6 s-text-[#63687E] s-whitespace-normal s-break-words"
            >
              {{ formData.phone }}
            </p>
          </div>
        </div>
        <div
          class="sm:s-mt-[46px] s-mt-[37px] s-text-xs s-text-[#63687E] s-leading-[19px]"
        >
          <p>
            Spleet will notify this person to complete required information for
            verification and you’ll be notified once verification is complete
          </p>
        </div>
        <div>
          <hr class="s-my-6" />
          <div>
            <div v-show="verifications.verificationRemaining < 1">
              <h2 class="s-mb-3.5 s-text-xs s-leading-4 s-font-bold">
                PAY FOR VERIFICATION
              </h2>
              <Select
                :class="'s-mr-6 md:s-mr-8 s-w-full s-capitalize'"
                label=""
                name="status"
                icon=""
                :options="verificationPlans"
                :value="formData.paymentOption"
                @update="(value) => (formData.paymentOption = value)"
              />
              <hr class="s-my-6" />
              <div class="s-mb-[3.5rem]">
                <p
                  class="s-uppercase s-font-bold s-text-xs s-text-[#242428] s-mb-5"
                >
                  Choose Your Payment Option
                </p>
                <flutterwave-pay-button
                  ref="flutterwave"
                  :tx_ref="generateReference()"
                  :amount="amount"
                  currency="NGN"
                  payment_options="card,ussd,banktransfer"
                  redirect_url=""
                  class="s-hidden"
                  style=""
                  :meta="metaData"
                  :customer="{
                    name: userFullname,
                    email: userEmail,
                    phone_number: userPhoneNumber,
                  }"
                  :customizations="{
                    title: 'Payment Title',
                    description: 'Payment for Verification',
                    logo: 'https://res.cloudinary.com/spleetng/image/upload/v1611148920/logo-icon.svg',
                  }"
                  :callback="makePaymentCallback"
                  :onclose="closedPaymentModal"
                >
                  Click To Pay
                </flutterwave-pay-button>
                <div class="s-mb-4">
                  <input
                    id="flutterwave"
                    v-model="selectedPaymentOption"
                    type="radio"
                    value="flutterwave"
                  />
                  <label for="flutterwave" class="s-ml-2">
                    <img
                      src="@/assets/images/flutterwave.svg"
                      alt="flutterwave"
                      class="s-inline-block s-cursor-pointer"
                    />
                  </label>
                </div>
                <div>
                  <input
                    id="paystack"
                    v-model="selectedPaymentOption"
                    type="radio"
                    value="paystack"
                  />
                  <label for="paystack" class="s-ml-3.5">
                    <img
                      src="@/assets/images/paystack.svg"
                      alt="paystack"
                      class="s-inline-block s-cursor-pointer"
                    />
                  </label>
                </div>
              </div>
            </div>

            <Button
              v-show="verifications.verificationRemaining < 1"
              :disabled="fillAll"
              :text="'Pay & Submit'"
              :loading="loading"
              class="s-bg-primary-blue s-text-sm s-leading-[18px] s-text-white s-font-bold sm:s-px-10 s-px-[18px] s-mr-2 s-rounded-full sm:!s-py-[15px] s-py-[10px]"
              :class="[{ 's-bg-[#2E48DA]/60': fillAll }]"
              @submit="createNewTenant"
            />
            <Button
              v-show="verifications.verificationRemaining > 0"
              :text="'Submit'"
              :loading="loading"
              class="s-min-w-[140px] s-bg-primary-blue s-text-sm s-leading-[18px] s-text-white s-font-bold sm:s-px-10 s-px-[18px] s-mr-2 s-rounded-full sm:!s-py-[15px] s-py-[10px]"
              @submit="createTenantWithoutPayment"
            />
          </div>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import { required, email } from 'vuelidate/lib/validators'
import { validationMessage } from 'vuelidate-messages'
import Notice from '../../../components/reusables/Notice.vue'
import Paystack from '@/helpers/utils/paystackSetup'
const formMessages = {
  emailRequired: () => 'Email is required',
  displayNameRequired: () => 'Displayname is required',
  firstnameRequired: () => 'Firstname is required',
  lastnameRequired: () => 'Lastname is required',
  email: () => 'Must be a valid email',
  phoneRequired: () => 'Tenant phone number is required',
  requirePaymentOption: () => 'Please choose a subcription plan',
}

export default {
  name: 'Create',
  components: {
    Notice,
  },
  layout: 'host',
  data() {
    return {
      formData: {
        email: '',
        phone: '',
        firstName: '',
        lastName: '',
        displayName: '',
        countryCode: 'NG',
        callbackUrl: this.$config.verifyCallBackURL,
        paymentOption: '',
      },
      selectedPaymentOption: '',
      formattedPhoneNumber: '',
      showModal: false,
      loading: false,
      error: null,
      displayNoticeModal: false,
      noticeLoadingState: false,
      subscriptionValue: '',
      verificationPaymentOption: '',
      requestData: null,
    }
  },
  validations: {
    formData: {
      email: {
        emailRequired: required,
        email,
      },
      firstName: {
        firstnameRequired: required,
      },
      displayName: {
        displayNameRequired: required,
      },
      lastName: {
        lastnameRequired: required,
      },
      phone: {
        phoneRequired: required,
      },
    },
  },
  computed: {
    ...mapGetters('host/verify', ['verifications', 'allverificationPlans']),
    ...mapGetters('user', ['userFullname', 'userEmail', 'userPhoneNumber']),
    fillAll() {
      if (this.formData.paymentOption && this.selectedPaymentOption) {
        return false
      } else return true
    },
    metaData() {
      const data = {
        landlordId: this.landlordId,
        verificationPlan: this.formData.paymentOption,
        verificationId:
          this.formData.paymentOption === 'one time'
            ? this.requestData?.id
            : null,
        paymentOption:
          this.formData.paymentOption === 'one time' ? 'one time' : 'bulk',
      }
      Object.keys(data).forEach((key) => {
        if (data[key] === null) {
          delete data[key]
        }
      })
      return data
    },
    verificationPlans() {
      const formattedPlans = this.allverificationPlans.map((el) => {
        return { ...el, text: el.name, value: el.name }
      })
      return formattedPlans
    },
    subscriptionPlan() {
      const subscriptionPlans = this.allverificationPlans.map((el) => {
        return { ...el, text: el.name, value: el.name }
      })
      return subscriptionPlans.slice(0, -1)
    },
    amount() {
      if (
        this.verificationPlans.length > 0 &&
        this.formData.paymentOption !== ''
      ) {
        const amount = this.verificationPlans.find(
          (el) => el.name === this.formData.paymentOption
        )?.amount
        return amount
      } else return ''
    },
    landlordId() {
      const user = this.$cookies.get('user')
      return user?.userId
    },
  },
  async mounted() {
    try {
      await this.fetchVerficationPlans()
      await this.getLandordRemainingVerfication()
    } catch (error) {
      this.$errorHandler(error)
    }
    Paystack.init()
  },
  methods: {
    validationMsg: validationMessage(formMessages),
    ...mapMutations('host/verify', ['TOGGLE_SNACKBAR']),
    ...mapActions('host/verify', [
      'fetchVerficationPlans',
      'getLandordRemainingVerfication',
    ]),
    getPhoneNumberInfo(inputValue) {
      this.formattedPhoneNumber = inputValue.formattedNumber
      this.formData.countryCode = inputValue.countryCode
    },
    submitForm() {
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.error = this.$v
      } else {
        this.showModal = true
      }
    },
    closeModal() {
      this.showModal = false
      this.formData.paymentOption = ''
      this.selectedPaymentOption = ''
    },
    async createNewTenant() {
      this.loading = true
      try {
        const { paymentOption } = this.formData
        let data
        if (
          paymentOption === 'silver' ||
          paymentOption === 'gold' ||
          paymentOption === 'bronze'
        ) {
          data = 'bulk'
        } else {
          data = paymentOption
        }
        const response = await this.$axios.$post(
          'tenants/verification-requests',
          {
            ...this.formData,
            paymentOption: data,
            phone: this.formattedPhoneNumber.slice(1),
          }
        )
        this.loading = false
        if (response.statusCode === 201) {
          this.requestData = response.data.verifyRequest
          if (this.selectedPaymentOption === 'flutterwave') {
            this.$refs.flutterwave.$el.click()
          } else if (this.selectedPaymentOption === 'paystack') {
            this.makePayment()
          }
        }
      } catch (error) {
        this.$errorHandler(error)
        this.loading = false
      }
    },
    async createTenantWithoutPayment() {
      this.loading = true
      try {
        const { paymentOption, ...rest } = this.formData
        const response = await this.$axios.$post(
          'tenants/verification-requests',
          {
            ...rest,
            paymentOption: 'bulk',
            phone: this.formattedPhoneNumber.slice(1),
          }
        )
        this.loading = false
        this.closeModal()
        if (response.statusCode === 201) {
          this.$router.push('/host/verify')
          this.TOGGLE_SNACKBAR(true)
        }
      } catch (error) {
        this.loading = false
        this.$errorHandler(error)
      }
    },
    closeNoticeDialog() {
      this.displayNoticeModal = false
      this.verificationPaymentOption = 'one time'
      this.subscriptionValue = ''
      this.formData.paymentOption = ''
      this.selectedPaymentOption = ''
    },
    toggleTabs(tab) {
      this.subscriptionValue = tab.value
    },
    paySubscription() {
      if (this.formData.paymentOption && this.selectedPaymentOption) {
        switch (this.selectedPaymentOption) {
          case 'flutterwave': {
            this.$refs.flutterwave.$el.click()
            break
          }
          case 'paystack': {
            this.makePayment()
            break
          }
        }
      }
    },
    generateReference() {
      const date = new Date()
      return date.getTime().toString()
    },
    closedPaymentModal() {
      //
    },
    makePaymentCallback(response) {
      if (response.status === 'successful') {
        this.showModal = false
        this.$router.push('/host/verify')
        this.TOGGLE_SNACKBAR(true)
        // this.formData.paymentOption = 'one time'
      }
    },
    makePayment() {
      Paystack.startPayment(
        (res, err) => {
          if (res?.status === 'success') {
            this.showModal = false
            this.$router.push('/host/verify')
            this.TOGGLE_SNACKBAR(true)
            this.formData.paymentOption = 'one time'
          } else {
            return err
          }
        },
        Math.round(this.amount * 100),
        this.userEmail,
        this.metaData
      )
    },
  },
}
</script>

<style lang="scss" scoped>
.display__bg {
  background: rgba(46, 72, 218, 0.04);
}
.create-breakpoint {
  @media (min-width: 1150px) and (max-width: 1415px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1.5rem;
    margin-bottom: 34px !important;
  }
}
</style>
