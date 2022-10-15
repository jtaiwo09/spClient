<template>
  <div class="s-flex s-flex-col s-h-[90%] sm:s-h-full">
    <div class="s-max-w-[40rem] s-mx-5 s-mt-4">
      <div class="s-flex s-flex-col s-w-full sm:s-flex-row s-gap-0 sm:s-gap-7">
        <div class="s-w-full sm:s-w-1/2">
          <h5 class="s-text-sm s-font-semibold">MEANS OF VERIFICATION</h5>
          <Select
            class="s-w-full"
            name="verificationType"
            :options="selectVerificationType"
            :value="formData.verificationType"
            :error="error && error.verificationType"
            :validation-msg="validationMsg($v.formData.verificationType)"
            @update="(value) => (formData.verificationType = value)"
          />
        </div>

        <div class="s-w-full sm:s-w-1/2">
          <h5 class="s-text-sm s-font-semibold">ID NUMBER</h5>
          <TextField
            class="s-w-full"
            placeholder="Enter the number"
            type="text"
            name="firstname"
            :error="error && error.verificationNumber"
            :validation-msg="validationMsg($v.formData.verificationNumber)"
            :model-value="formData.verificationNumber"
            @update:modelValue="
              (value) => (formData.verificationNumber = value)
            "
          />
        </div>
      </div>

      <div
        class="s-flex s-flex-col s-w-full sm:s-flex-row s-gap-0 sm:s-gap-7 s-mt-10"
      >
        <div class="s-w-full sm:s-w-1/2 s-group">
          <h5 class="s-mb-6 s-text-sm s-font-semibold">ID IMAGE</h5>
          <div v-show="formData.verificationIDCard" class="s-flex s-flex-col s-items-center">
            <div
              class="s-w-full s-min-h-[203px] s-bg-contain s-bg-center s-bg-no-repeat"
              :style="{ backgroundImage: `url(${formData.verificationIDCard})` }"
            ></div>
            <Button
              text="Change ID Card Image"
              :class="'s-bg-primary-blue s-text-white s-py-3 s-px-4 s-mt-3'"
              @submit="onPickIdImage"
            />
          </div>

          <div
            v-show="!formData.verificationIDCard"
            class="s-bg-[#FAFAFE] s-flex s-p-8 s-items-center s-align-middle s-place-content-center s-border s-border-solid s-border-[#99A4E1] s-rounded-lg s-min-h-[203px] group-hover:s-bg-[#EEEEFF] group-hover:s-cursor-pointer"
            @click="onPickIdImage"
          >
            <input
              type="file"
              ref="IdImageInput"
              @change="onPickedIdImage"
              class="s-hidden"
              accept="image/*"
            />
            <div class="s-flex s-flex-col s-items-center">
              <img src="~/assets/icons/verificationCard.svg" class="s-mb-3" />
              <p class="s-text-xs s-font-light">No Identification Image</p>
            </div>

          </div>

          <span v-show="validationMsg($v.formData.verificationIDCard)"
            class="s-text-xs s-text-[#EA4335] s-block s-mt-1 s-ml-2 s-font-normal s-leading-4"
            >{{ validationMsg($v.formData.verificationIDCard) }}</span>
        </div>

        <div class="s-w-full sm:s-w-1/2 s-group">
          <h5 class="s-mb-6 s-text-sm s-font-semibold">SELFIE</h5>

          <div v-show="formData.verificationSelfie" class="s-flex s-flex-col s-items-center">
            <div
            class="s-w-full s-min-h-[203px] s-bg-contain s-bg-center s-bg-no-repeat"
              :style="{ backgroundImage: `url(${formData.verificationSelfie})` }"
            ></div>
            <Button
              text="Retake Selfie"
              :class="'s-bg-primary-blue s-text-white s-py-3 s-px-4 s-mt-3'"
              @submit="launchCamera"
            />
          </div>

          <div
            v-show="selfie == null && !isSelfieUploaded && !formData.verificationSelfie"
            class="s-bg-[#FAFAFE] s-flex s-p-8 s-items-center s-align-middle s-place-content-center s-border s-border-solid s-border-[#99A4E1] s-rounded-lg s-min-h-[203px] group-hover:s-bg-[#EEEEFF] group-hover:s-cursor-pointer"
            @click="launchCamera"
          >
            <div class="s-flex s-flex-col s-items-center">
              <img src="~/assets/icons/verificationCard.svg" class="s-mb-3" />
              <p class="s-text-xs s-font-light">click to take selfie</p>
            </div>
          </div>
          <span v-show="validationMsg($v.formData.verificationSelfie)"
            class="s-text-xs s-text-[#EA4335] s-block s-mt-1 s-ml-2 s-font-normal s-leading-4"
            >{{ validationMsg($v.formData.verificationSelfie) }}</span>
        </div>
      </div>

    </div>
    <div class="s-flex s-justify-end s-mt-10 btn s-mx-10">
        <Button
          text="Save Changes"
          :class="'s-bg-primary-blue s-text-white s-py-3 s-px-5'"
          :loading="loading"
          :disabled="loading"
          @submit="updateVerification"
        />
      </div>
      
    <Modal :show="show" @close="show = false">
      <h2 class="s-font-bold s-text-[1.25rem] s-text-[#0E0C0C] s-mb-4">
        Take selfie
      </h2>
      <div class="s-w-full s-h-[17.125rem] s-bg-[#D9D9D9] s-relative flip">
        <img
          v-show="selfie != null"
          :src="selfie"
          alt=""
          class="s-w-full s-h-full s-object-cover"
        />
        <vue-web-cam
          ref="webcam"
          :device-id="deviceId"
          class="s-w-full s-h-full s-object-cover s-absolute s-top-0"
          @error="onError"
          @cameras="onCameras"
          @camera-change="onCameraChange"
        />
      </div>
      <p
        v-show="selfie != null"
        class="s-text-primary-blue s-text-sm s-font-semibold s-mt-1 s-cursor-pointer"
        @click="retake"
      >
        Retake selfie
      </p>
      <div
        class="s-flex s-justify-center s-mt-4 s-cursor-pointer"
        @click="onCapture"
      >
        <CameraIcon />
      </div>
      <div v-show="selfie != null" class="s-flex s-justify-end s-mt-2">
        <Button
          text="Upload"
          :loading="loading"
          :class="'s-bg-primary-blue s-px-5 s-w-[8.125rem]'"
          @submit="uploadSelfie"
        />
      </div>
    </Modal>
  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
import { validationMessage } from 'vuelidate-messages'
import { mapActions, mapState } from 'vuex'

const formMessages = {
  verificationTypeRequired: () => 'Verification Type is required',
  verificationNumberRequired: () => 'Verification Number is required',
  verificationIDCardRequired: () => 'Verification ID Card Image is required',
  verificationSelfieRequired: () => 'Verification Selfie is required',
}
export default {
  name: 'Profile',
  data() {
    return {
      formData: {
        verificationType: null,
        verificationNumber: '',
        verificationIDCard: '',
        verificationSelfie: '',
      },
      formattedPhoneNumber: '',
      error: null,
      show: false,
      loading: false,
      devices: [],
      selfie: null,
      camera: null,
      deviceId: null,
      startCam: false,
      isSelfieUploaded: false,
      selectedImage: '',
    }
  },
  validations() {
    return {
      formData: {
        verificationType: {
          verificationTypeRequired: required,
        },
        verificationNumber: {
          verificationNumberRequired: required,
        },
        verificationIDCard: {
          verificationIDCardRequired: required,
        },
        verificationSelfie: {
          verificationSelfieRequired: required,
        },
      },
    }
  },
  computed: {
    ...mapState('user', ['userData']),
    selectVerificationType() {
      return [
        { text: 'International passport', value: 'passport' },
        { text: 'Drivers license', value: 'driver_license' },
        { text: 'NIN (National ID)', value: 'national_id' },
        { text: 'Voters Card', value: 'voter' },
      ]
    },
  },

  watch: {
    camera(id) {
      this.deviceId = id
    },

    devices() {
      const [first] = this.devices
      if (first) {
        this.camera = first.deviceId
        this.deviceId = first.deviceId
      }
    },
  },
  mounted() {
    this.getDocumentDetails()
  },
  methods: {
    ...mapActions('user', ['addDoc']),
    ...mapActions('util', ['imageUpload']),
    validationMsg: validationMessage(formMessages),
    getDocumentDetails(){
        if (this.userData && this.userData.kyc) {
          this.formData = {
          verificationType: this.userData.kyc.identificationType ?? null,
          verificationNumber: this.userData.kyc.idNumber ?? null,
          verificationIDCard: this.userData.kyc.identification ?? null,
          verificationSelfie: this.userData.kyc.selfie ?? null,
        }
      }
    },
    launchCamera() {
      if (this.show) {
        this.$refs.webcam.stop()
      }
      this.show = !this.show
      this.startCam = false
    },
    retake() {
      this.startCam = true
      this.$refs.webcam.start()
    },
    onCapture() {
      this.selfie = this.$refs.webcam.capture()
      this.startCam = false
      this.$refs.webcam.stop()
    },
    onStop() {
      this.$refs.webcam.stop()
    },
    onStart() {
      this.$refs.webcam.start()
    },
    onError(error) {
      this.$showToast(error, 'error')
    },
    onCameras(cameras) {
      this.devices = cameras
    },
    onCameraChange(deviceId) {
      this.deviceId = deviceId
      this.camera = deviceId
    },
    onPickIdImage() {
      this.$refs.IdImageInput.click()
    },

    async onPickedIdImage() {
      this.loading = true
      this.selectedImage = this.$refs.IdImageInput.files[0]
      const preset = this.$config.cloudinaryPreset
      const formData = new FormData()
      formData.append('file', this.selectedImage)
      formData.append('upload_preset', preset)

      try {
        if(formData.verificationIDCard){
          const publicId  = formData.verificationIDCard.split('.');
          await this.deleteCloudinaryImage(publicId[0])
        }
        const response = await this.imageUpload(formData)
        this.formData.verificationIDCard = response.url
        this.loading = false
      } catch (error) {
        this.loader = false
        this.$errorHandler(error)
      }
    },

    uploadSelfie() {
      this.loading = true
      function urltoFile(url, filename, mimeType) {
        return fetch(url)
          .then((res) => {
            return res.arrayBuffer()
          })
          .then((buf) => {
            return new File([buf], filename, { type: mimeType })
          })
      }

      urltoFile(this.selfie, 'selfie.jpg', 'image/jpeg').then(async (file) => {
        const preset = this.$config.cloudinaryPreset
        const formData = new FormData()
        formData.append('file', file)
        formData.append('upload_preset', preset)
        formData.append('folder', 'frontend/kyc')

        try {
          const response = await this.imageUpload(formData)
          this.loading = false
          this.selfie = response.secure_url
          this.formData.verificationSelfie = response.secure_url
          // this.selfiePublicId = response.public_id
          this.isSelfieUploaded = true
          this.launchCamera()
        } catch (error) {
          this.loading = false
          this.$errorHandler(error)
        }
      })
    },

   async updateVerification() {
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.error = this.$v.formData
      } else {
        this.error = null
        this.loading = true
        try {
          const response = await this.addDoc({
            selfie: this.formData.verificationSelfie,
            identificationType: this.formData.verificationType,
            identification: this.formData.verificationIDCard,
            idNumber: this.formData.verificationNumber
          })
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
