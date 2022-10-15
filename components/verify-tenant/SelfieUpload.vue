<template>
  <div>
    <div class="s-flex s-flex-col s-h-[90%] sm:s-h-full">
      <p class="s-text-sm s-text-[#222228] s-font-semibold s-mb-2.5">
        Take a selfie
      </p>
      <div class="s-flex s-flex-col sm:s-flex-row s-w-full">
        <div class="s-flex-1 sm:s-mr-6">
          <div
            class="s-mb-2 s-py-2.5 s-px-5 s-flex s-items-center s-border s-border-solid s-border-[#E0E3F2] s-rounded-[0.625rem] s-cursor-pointer"
            @click="launchCamera"
          >
            <PlusButton :class="'s-mr-4'" />
            <span class="s-font-semibold s-text-xs s-text-[#0F0C3D]"
              >Tap to launch camera</span
            >
          </div>
          <small class="s-text-[red] s-text-xs s-block s-mt-1 s-ml-2.5">{{
            validationMsg($v.selfie)
          }}</small>
          <small
            v-show="selfie && !isSelfieUploaded"
            class="s-text-[red] s-text-xs s-block s-mt-1 s-ml-2.5"
            >{{ validationMsg($v.isSelfieUploaded) }}</small
          >
          <div
            v-if="selfie && isSelfieUploaded"
            class="s-min-h-[17.375rem] s-border s-border-solid s-border-[#E0E3F2] s-rounded-[0.625rem] s-overflow-hidden"
          >
            <img
              :src="selfie"
              alt=""
              class="s-h-[14.375rem] s-w-full s-object-cover"
            />
            <span
              class="s-text-xs s-font-semibold s-text-primary-blue s-block s-text-center s-mt-3 s-cursor-pointer"
              @click="launchCamera"
              >Retake Photo</span
            >
          </div>
        </div>
        <div class="s-flex-1 s-mt-10 sm:s-mt-0">
          <div
            class="s-min-h-[17.375rem] sm:s-border s-border-solid s-border-[#E0E3F2] s-rounded-[0.625rem] sm:s-p-6"
          >
            <p class="s-text-sm s-text-[#222228] s-font-semibold s-mb-2.5">
              How to take a great selfie
            </p>
            <CameraIcon :class="'s-hidden sm:s-block'" />
            <ul
              class="s-list-disc s-pl-2 s-text-xs s-text-[#646466] s-font-normal s-mt-[1.375rem]"
            >
              <li class="s-mb-2">
                Wipe the surface of the camera lens from smudges.
              </li>
              <li class="s-mb-2">
                Make sure you are in front of a plain background.
              </li>
              <li class="s-mb-2">Make sure your face is clear and visible.</li>
              <li class="s-mb-2">Ensure that you are in a well lit space.</li>
            </ul>
          </div>
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
import { mapMutations, mapState, mapActions } from 'vuex'
import { validationMessage } from 'vuelidate-messages'

const formMessages = {
  selfieRequired: () => 'Kindly take a selfie',
  selfieNotUploaded: () =>
    'Selfie was not uploaded, kindly click the upload button.',
}

const checkUpload = (value) => {
  return value
}

export default {
  data() {
    return {
      selfie: null,
      selfiePublicId: null,
      camera: null,
      deviceId: null,
      devices: [],
      startCam: false,
      error: null,
      show: false,
      loading: false,
      isSelfieUploaded: false,
    }
  },
  validations() {
    return {
      selfie: {
        selfieRequired: required,
      },
      isSelfieUploaded: {
        selfieNotUploaded: checkUpload,
      },
    }
  },
  computed: {
    ...mapState('renters/verify', ['currentStep']),
    identificationType() {
      return [
        { text: "Voter's Card", value: 'voters-card' },
        { text: "Driver's License", value: 'drivers-license' },
        { text: 'International Passport', value: 'international-passport' },
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
  methods: {
    ...mapMutations('renters/verify', [
      'INCREMENT_STEP',
      'DECREMENT_STEP',
      'SHOW_SELFIE_UPLOAD',
    ]),
    ...mapActions('renters/verify', ['imageUpload', 'uploadSelfieToBackend']),
    validationMsg: validationMessage(formMessages),
    scrolltoTop() {
      window.scrollTo(0, 0)
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

        try {
          const response = await this.imageUpload(formData)
          this.loading = false
          this.selfie = response.secure_url
          this.selfiePublicId = response.public_id
          this.isSelfieUploaded = true
          this.launchCamera()
        } catch (error) {
          this.loading = false
          this.$errorHandler(error)
        }
      })
    },
    async submit() {
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.error = this.$v
      } else {
        this.loading = true
        this.error = null
        const data = {
          selfie: this.selfie,
          selfiePublicId: this.selfiePublicId,
        }
        try {
          const response = await this.uploadSelfieToBackend(data)
          this.loading = false
          if (response.data.statusCode === 200) {
            this.SHOW_SELFIE_UPLOAD()
            this.INCREMENT_STEP()
            this.scrolltoTop()
          }
        } catch (error) {
          this.loading = false
          this.$errorHandler(error)
        }
      }
    },
    decreaseStep() {
      if (this.currentStep > 1) {
        this.error = null
        this.SHOW_SELFIE_UPLOAD()
        this.scrolltoTop()
      }
    },
  },
}
</script>

<style>
.flip {
  transform: rotateY(180deg);
}
</style>
