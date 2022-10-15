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
            Upload your ID Card
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
          <div class="">
            <div
              class="s-flex s-flex-col sm:s-flex-row sm:s-mb-[2rem] sm:s-space-x-8"
            >
              <div class="s-w-full sm:s-w-1/2 s-mb-[1.5rem] sm:s-mb-0">
                <label
                  class="s-text-[#222228] s-text-sm s-font-semibold s-block s-mb-3"
                  >Identification Card Type</label
                >
                <Select
                  :class="'s-w-full !s-mb-0'"
                  name="identificationType"
                  :options="identificationOptions"
                  :error="error && error.identificationType"
                  :validation-msg="
                    validationMsg($v.formData.identificationType)
                  "
                  :value="formData.identificationType"
                  @update="(value) => (formData.identificationType = value)"
                />
              </div>
              <div class="s-w-full sm:s-w-1/2 s-mb-[1.5rem] sm:s-mb-0">
                <label
                  class="s-text-[#222228] s-text-sm s-font-semibold s-block s-mb-3"
                  >ID Card Number</label
                >
                <TextField
                  :class="'s-w-full !s-mb-0'"
                  placeholder="Enter Enter Number"
                  type="number"
                  name="idNumber"
                  :error="error && error.idNumber"
                  :validation-msg="validationMsg($v.formData.idNumber)"
                  :model-value="formData.idNumber"
                  @update:modelValue="(value) => (formData.idNumber = value)"
                />
              </div>
            </div>
            <div class="s-flex-1 s-mb-[1.375rem] sm:s-mb-0">
              <label
                class="s-text-[#222228] s-text-sm s-font-semibold s-block s-mb-3"
                >Upload ID</label
              >
              <input
                ref="file"
                type="file"
                class="s-hidden"
                @change="handleFileUpload"
              />
              <div
                class="s-mb-2 s-py-2.5 s-px-5 s-flex s-items-center s-border s-border-solid s-border-[#E0E3F2] s-rounded-[0.625rem] s-cursor-pointer"
                @click="TriggerFile"
              >
                <PlusButton :class="'s-mr-4'" />
                <span class="s-font-semibold s-text-xs s-text-[#0F0C3D]"
                  >Browse</span
                >
              </div>
              <FormFieldError
                :validation-msg="validationMsg($v.formData.identification)"
              />
              <div
                v-if="formData.identification && !show"
                class="s-min-h-[17.375rem] s-w-full sm:s-w-1/2 s-border s-border-solid s-border-[#E0E3F2] s-rounded-[0.625rem] s-overflow-hidden"
              >
                <img
                  :src="formData.identification"
                  alt=""
                  class="s-h-[14.375rem] s-w-full s-object-contain"
                />
                <span
                  class="s-text-xs s-font-semibold s-text-primary-blue s-block s-text-center s-mt-3 s-cursor-pointer"
                  @click="TriggerFile"
                  >Retake Photo</span
                >
              </div>
            </div>
          </div>
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
    <Modal :show="show" @close="show = false">
      <h2 class="s-font-bold s-text-[1.25rem] s-text-[#0E0C0C] s-mb-7">
        Upload File
      </h2>
      <div class="s-w-full s-h-[17.125rem] s-bg-[#D9D9D9]">
        <img
          :src="formData.identification"
          alt=""
          class="s-w-full s-h-full s-object-cover"
        />
      </div>
      <div class="s-flex s-justify-end s-mt-[2.5rem]">
        <Button
          text="Change"
          :class="'s-w-[8.375rem] s-border-2 s-border-solid s-border-primary-blue !s-py-3 !s-text-primary-blue s-mr-2'"
          @submit="TriggerFile"
        />
        <Button
          text="Continue"
          :class="'s-w-[8.375rem] s-bg-primary-blue !s-py-3'"
          @submit="show = false"
        />
      </div>
    </Modal>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { required } from 'vuelidate/lib/validators'
import { validationMessage } from 'vuelidate-messages'

const formMessages = {
  identificationTypeRequired: () => 'Please select an identification card type',
  idNumberRequired: () => 'Please select an identification card type',
  identificationRequired: () => 'Please upload an identity card',
}

export default {
  data() {
    return {
      formData: {
        identificationType: '',
        idNumber: '',
        identification: '',
      },

      show: false,
      error: null,
      loading: false,
    }
  },
  validations() {
    return {
      formData: {
        identificationType: {
          identificationTypeRequired: required,
        },
        idNumber: {
          idNumberRequired: required,
        },
        identification: {
          identificationRequired: required,
        },
      },
    }
  },
  computed: {
    ...mapState('user', ['userData', 'loader']),
    identificationOptions() {
      return [
        {
          text: 'National ID card',
          value: 'national_id',
        },
        {
          text: 'Driver’s License',
          value: 'driver_license',
        },
        {
          text: 'Voter’s card',
          value: 'voter',
        },
        {
          text: 'International passport',
          value: 'passport',
        },
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
    ...mapActions('util', ['imageUpload']),
    validationMsg: validationMessage(formMessages),
    TriggerFile() {
      this.$refs.file.click()
    },
    async handleFileUpload(e) {
      const file = e.target.files[0]
      if (file !== undefined) {
        this.loader = true
        const preset = this.$config.cloudinaryPreset
        const formData = new FormData()
        formData.append('file', file)
        formData.append('upload_preset', preset)
        try {
          const response = await this.imageUpload(formData)
          this.loader = false
          this.formData.identification = response.secure_url
          this.show = true
        } catch (error) {
          this.loader = false
          this.$errorHandler(error)
        }
      }
    },
    async next() {
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.error = this.$v.formData
      } else {
        this.loading = true
        try {
          const response = await this.addDoc(this.formData)
          this.loading = false
          if (response.data.statusCode === 200) {
            this.$router.push({
              name: 'host-listing-kyc',
              query: { step: 3, level: 4 },
            })
          }

          this.loading = false
        } catch (error) {
          this.loading = false
          this.$errorHandler(error)
        }
      }
    },
    back() {
      this.$router.push({
        name: 'host-listing-kyc',
        query: { step: 3, level: 2 },
      })
    },
    updateForm() {
      if (this.userData && this.userData.kyc) {
        this.formData.idNumber = this.userData.kyc.idNumber
          ? this.userData.kyc.idNumber
          : ''
        this.formData.identification = this.userData.kyc.identification
          ? this.userData.kyc.identification
          : ''
        this.formData.identificationType = this.userData.kyc.identificationType
          ? this.userData.kyc.identificationType
          : ''
      }
    },
  },
}
</script>
