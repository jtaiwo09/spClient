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
            Physical Verification
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
            text="Submit"
            :loading="loading"
            @submit="submit"
          />
        </div>
      </div>
      <div class="s-flex md-s:s-block s-flex-col">
        <div class="s-px-6 md-x:!s-px-[3.25rem]">
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
                  <p
                    class="s-text-sm s-text-[#222228] s-font-semibold s-mb-2.5"
                  >
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
                    <li class="s-mb-2">
                      Make sure your face is clear and visible.
                    </li>
                    <li class="s-mb-2">
                      Ensure that you are in a well lit space.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <Modal :show="show" @close="show = false">
            <h2 class="s-font-bold s-text-[1.25rem] s-text-[#0E0C0C] s-mb-4">
              Take selfie
            </h2>
            <div
              class="s-w-full s-h-[17.125rem] s-bg-[#D9D9D9] s-relative flip"
            >
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
          <Modal
            :show="goLiveModal"
            modal-classes="s-px-[1.75rem] sm:s-px-[2.75rem]"
            @close="goLiveModal = false"
          >
            <div>
              <h2
                class="s-mb-1 s-font-bold s-text-[1.25rem] s-text-[#0E0C0C] s-leading-6"
              >
                Ready to go live <span v-if="false">again</span>?
              </h2>
              <p
                class="s-max-w-[22.625rem] s-my-[1.265rem] s-w-full s-font-normal s-text-xs s-text-primary"
              >
                Resubmit your listing to be published on Spleet. It will go live
                once it’s approved. Here’s what has changed with your update.
                Please go over to make sure it’s correct.
              </p>
              <div v-if="false" class="s-mb-7">
                <div class="s-mb-7">
                  <p class="s-font-bold s-text-sm text-[#0E0C0C]">
                    Previous Details
                  </p>
                  <p
                    class="s-font-normal s-text-xs s-text-primary s-leading-6 s-mb-1"
                  >
                    Last updated 26 June, 2023
                  </p>
                  <div
                    class="s-bg-[#b1b7d647] s-border s-border-solid s-border-[#D2D0E9] s-rounded-xl s-px-5 s-py-4"
                  >
                    <p class="s-text-sm">
                      <span class="s-font-bold">Monthly Rent: </span>50,000 NGN
                    </p>
                  </div>
                </div>
                <div class="s-mb-7">
                  <p class="s-font-bold s-text-sm text-[#0E0C0C]">
                    New Details
                  </p>
                  <p
                    class="s-font-normal s-text-xs s-text-primary s-leading-6 s-mb-1"
                  >
                    Last updated few minutes ago
                  </p>
                  <div
                    class="s-bg-[#b1b7d647] s-border s-border-solid s-border-[#D2D0E9] s-rounded-xl s-px-5 s-py-4"
                  >
                    <p class="s-text-sm">
                      <span class="s-font-bold">Monthly Rent: </span>150,000 NGN
                    </p>
                  </div>
                </div>
              </div>
              <div class="s-flex s-w-full s-space-x-4">
                <Button
                  :class="'s-hidden s-grow sm:s-flex s-bg-primary-blue s-text-white s-px-3 s-py-2.5 s-font-bold'"
                  text="Submit For Review"
                  :loading="publishLoader"
                  @submit="publish"
                />
                <Button
                  :class="'sm:s-hidden s-grow s-bg-primary-blue s-text-white !s-mx-0 s-py-2.5 s-font-bold'"
                  text="Submit"
                  :loading="publishLoader"
                  @submit="publish"
                />
                <Button
                  :class="'s-mr-1.5 s-grow s-border-2 s-border-solid s-border-primary-blue !s-text-primary-blue s-py-2.5 s-px-5 s-font-bold'"
                  text="Do This Later"
                  @submit="closeModal"
                />
              </div>
            </div>
          </Modal>
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
            text="Submit"
            :loading="loading"
            @submit="submit"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
import { mapActions, mapState } from 'vuex'
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
      goLiveModal: false,
      publishLoader: false,
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
    ...mapState('user', ['loader', 'userData']),
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
    userData: 'updateForm',
  },
  mounted() {
    this.updateForm()
  },
  methods: {
    ...mapActions('util', ['imageUpload']),
    ...mapActions('user', ['addDoc']),
    ...mapActions('host/listing', ['publishListing']),
    validationMsg: validationMessage(formMessages),
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
        formData.append('folder', 'frontend/kyc')

        try {
          const response = await this.imageUpload(formData)
          this.loading = false
          this.selfie = response.secure_url
          // this.selfiePublicId = response.public_id
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
          photo: this.selfie,
        }
        try {
          const response = await this.addDoc(data)
          this.loading = false
          if (response.data.statusCode === 200) {
            this.goLiveModal = true
          }
        } catch (error) {
          this.loading = false
          this.$errorHandler(error)
        }
      }
    },
    back() {
      this.$router.push({
        name: 'host-listing-kyc',
        query: { step: 3, level: 3 },
      })
    },
    updateForm() {
      if (this.userData && this.userData.kyc) {
        const { selfie } = this.userData.kyc
        if (selfie) {
          this.isSelfieUploaded = true
          this.selfie = selfie
        }
      }
    },
    async publish() {
      try {
        this.publishLoader = true
        const response = await this.publishListing()
        this.publishLoader = false
        this.goLiveModal = false
        if (response.data.statusCode === 200) {
          this.$router.push('/host/listing')
        }
      } catch (error) {
        this.publishLoader = false
        this.$errorHandler(error)
      }
    },
    closeModal() {
      this.goLiveModal = false
      this.$router.push('/host/listing')
    },
  },
}
</script>
