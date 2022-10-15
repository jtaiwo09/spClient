<template>
  <div>
    <Loading v-if="loading" />
    <div v-else class="s-flex s-flex-col s-h-[90%] sm:s-h-full">
      <div v-if="verificationMeans === 'metamap'" class="s-w-full s-flex">
        <!-- eslint-disable vue/attribute-hyphenation-->
        <mati-button
          ref="mati"
          :class="'s-hidden'"
          :clientId="clientId"
          :flowId="flowId"
          color="#505DED"
          :metadata="metadata"
          @mati:userFinishedSdk="userFinishedSdk"
        />
        <Button
          text="Go Back"
          :class="'s-mr-4 s-bg-[#fff] sm:s-border-2 sm:s-border-solid sm:s-border-primary-blue !s-text-primary-blue s-py-3 s-w-full sm:s-w-32'"
          @submit="decreaseStep"
        />
        <Button
          text="Verify me"
          :loading="loading"
          :class="'s-bg-primary-blue s-text-[#fff] s-py-3 s-w-full sm:s-w-32'"
          @submit="triggerMati"
        />
      </div>
      <div v-else>
        <div>
          <div
            class="sm:s-border-b sm:s-border-b-[#b1b7d6]/[0.19] sm:s-border-solid sm:s-pb-4 sm:s-mb-7"
          >
            <CountrySelector
              label="Select country"
              :error="error && error.countryCode"
              :validation-msg="validationMsg($v.formData.countryCode)"
              @updateCountry="(value) => (formData.countryCode = value.code)"
            />
          </div>
          <div class="s-flex s-flex-col s-w-full sm:s-mr-8 sm:s-flex-row">
            <Select
              :class="'s-mr-6 md:s-mr-8 s-w-full'"
              label="Identification Type"
              name="identificationType"
              icon="DocumentIcon"
              :options="identificationType"
              :error="error && error.identificationType"
              :validation-msg="validationMsg($v.formData.identificationType)"
              :value="formData.identificationType"
              @update="(value) => (formData.identificationType = value)"
            />
            <TextField
              :class="'s-w-full'"
              label="Identification Number"
              placeholder="Enter Identification Number"
              type="text"
              icon="DocumentIcon"
              name="identificationNumber"
              :error="error && error.identificationNumber"
              :validation-msg="validationMsg($v.formData.identificationNumber)"
              :model-value="formData.identificationNumber"
              @update:modelValue="
                (value) => (formData.identificationNumber = value)
              "
            />
          </div>
          <div class="s-flex s-flex-col s-w-full sm:s-flex-row">
            <File
              :class="'s-mr-6 md:s-mr-8 s-w-full'"
              label="Upload front of Id"
              type="file"
              name="identificationFront"
              :error="error && error.identificationFront"
              :validation-msg="validationMsg($v.formData.identificationFront)"
              :value="fileUploadFront"
              @update="(value) => (formData.identificationFront = value)"
              @remove="
                ;(fileUploadFront = null), (formData.identificationFront = null)
              "
              @uploaded="getUploadedData($event, 'front')"
            />
            <File
              :class="'s-w-full'"
              label="Upload back of Id"
              type="file"
              name="identificationBack"
              :disabled="
                formData.identificationType === 'passport' ||
                formData.identificationType === 'nin'
              "
              :error="error && error.identificationBack"
              :validation-msg="validationMsg($v.formData.identificationBack)"
              :value="fileUploadBack"
              @update="(value) => (formData.identificationBack = value)"
              @remove="
                ;(fileUploadBack = null), (formData.identificationBack = null)
              "
              @uploaded="getUploadedData($event, 'back')"
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
            text="Submit"
            :loading="loading"
            :class="'s-bg-primary-blue s-text-[#fff] s-py-3 s-w-full sm:s-w-32'"
            @submit="submit"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { required, requiredIf } from 'vuelidate/lib/validators'
import { mapMutations, mapState, mapActions } from 'vuex'
import { validationMessage } from 'vuelidate-messages'

const formMessages = {
  identificationTypeRequired: () => 'Choose your identification type',
  identificationNumberRequired: () => 'ID number is required',
  identificationFrontRequired: () => 'Upload front of ID',
  identificationBackRequired: () => 'Upload back of ID',
  countryCodeRequired: () => 'Select country',
}
export default {
  data() {
    return {
      fileUploadFront: null,
      fileUploadBack: null,
      formData: {
        identificationType: '',
        identificationNumber: '',
        identificationFront: null,
        identificationBack: null,
        countryCode: null,
      },
      error: null,
      loading: false,
      clientId: this.$config.metaMapClientId,
      flowId: this.$config.metaMapFlowId,
      verificationMeans: '',
    }
  },
  head() {
    return {
      script: [
        {
          src: 'https://web-button.getmati.com/button.js',
        },
      ],
    }
  },
  validations() {
    return {
      formData: {
        identificationType: {
          identificationTypeRequired: required,
        },
        identificationNumber: {
          identificationNumberRequired: required,
        },
        identificationFront: {
          identificationFrontRequired: required,
        },
        identificationBack: {
          identificationBackRequired: requiredIf(() => {
            if (
              this.formData.identificationType === 'passport' ||
              this.formData.identificationType === 'nin'
            )
              return false
            else return true
          }),
        },
        countryCode: {
          countryCodeRequired: required,
        },
      },
    }
  },
  computed: {
    ...mapState('renters/verify', ['currentStep', 'userData']),
    checkPayload() {
      const data = {
        ...this.formData,
        idPublicId: this.fileUploadFront?.public_id,
        idPublicIdBack: this.fileUploadBack?.public_id,
      }
      Object.keys(data).forEach((key) => {
        if (data[key] === null || data[key] === undefined) {
          delete data[key]
        }
      })
      return data
    },
    identificationType() {
      return [
        { text: "Voter's Card", value: 'votersCard' },
        { text: "Driver's License", value: 'driversLicense' },
        { text: 'International Passport', value: 'passport' },
        { text: 'National Identification Number', value: 'nin' },
      ]
    },
    metadata() {
      return JSON.stringify({ verificationId: this.userData.verificationId })
    },
  },
  created() {
    this.checkVerificationType()
  },
  mounted() {},
  methods: {
    ...mapMutations('renters/verify', [
      'INCREMENT_STEP',
      'DECREMENT_STEP',
      'SHOW_SELFIE_UPLOAD',
      'SET_STEP',
    ]),
    ...mapActions('renters/verify', ['documentUpload', 'verificationType']),
    validationMsg: validationMessage(formMessages),
    scrolltoTop() {
      window.scrollTo(0, 0)
    },
    getUploadedData(value, id) {
      if (id === 'front') {
        this.fileUploadFront = value
        this.formData.identificationFront = value.secure_url
      } else {
        this.fileUploadBack = value
        this.formData.identificationBack = value.secure_url
      }
    },
    async submit() {
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.error = this.$v.formData
      } else {
        this.loading = true
        this.error = null
        try {
          await this.documentUpload(this.checkPayload)
          this.loading = false
          this.SHOW_SELFIE_UPLOAD()
        } catch (error) {
          this.loading = false
          this.$errorHandler(error)
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
    userFinishedSdk({ detail }) {
      if (detail?.identityId !== null || detail?.identityId !== undefined) {
        this.SET_STEP(6)
      }
    },
    triggerMati() {
      this.$refs.mati.click()
    },
    async checkVerificationType() {
      this.loading = true
      try {
        const response = await this.verificationType()
        this.loading = false
        this.verificationMeans = response.data.data.name
      } catch (error) {
        this.loading = false
        this.$errorHandler(error)
      }
    },
  },
}
</script>

<style></style>
