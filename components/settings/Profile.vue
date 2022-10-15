<template>
  <div class="s-flex s-flex-col s-h-[90%] sm:s-h-full">
    <div class="s-max-w-[40rem] s-mx-5 s-mt-4">
      <div
        class="s-flex s-flex-col s-w-full sm:s-flex-row s-gap-0 sm:s-gap-7 s-mb-10 s-h-36"
      >
        <div class="s-w-3/4">
          <div class="s-w-full s-flex s-gap-7 s-justify-center s-items-center">
            <div class="s-relative s-group s-flex" @click="onPickFile">
              <input
                type="file"
                ref="fileInput"
                @change="previewImage"
                class="s-hidden"
                accept="image/*"
              />
              <img
                v-if="!preview"
                class="s-rounded-full s-w-28 s-h-28 s-z-10 s-relative"
                :src="
                  formData.photo
                    ? formData.photo
                    : 'https://res.cloudinary.com/spleetng/image/upload/v1659339587/frontend-images/default-image.jpg'
                "
              />

              <img
                v-if="preview"
                class="s-rounded-full s-w-28 s-h-28 s-z-10 s-relative"
                :src="preview"
              />

              <div
                class="s-rounded-full s-w-28 s-h-28 s-z-40 s-absolute s-cursor-pointer s-bg-black/25 s-flex s-items-center s-align-middle s-justify-center"
              >
                <img
                  src="~/assets/icons/Camera.svg"
                  alt="icon"
                  class="s-object-center s-w-5 s-h-5 s-hidden group-hover:s-block"
                />
              </div>
            </div>
            <div class="s-w-4/6">
              <Button
                v-if="loading"
                text="Uploading image"
                :class="'s-bg-primary-blue s-text-white s-px-7 s-py-3 s-w-2/3'"
                :disabled="true"
                :loading="loading"
                @submit="onChangeProfile()"
              />
            </div>
          </div>
        </div>
      </div>

      <div class="s-flex s-flex-col s-w-full sm:s-flex-row s-gap-0 sm:s-gap-7">
        <TextField
          class="s-w-full sm:s-w-1/2"
          label="First Name"
          placeholder="Enter First Name"
          :disabled="true"
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
          :disabled="true"
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
        <TextField
          class="s-w-full sm:s-w-1/2"
          label="Email"
          placeholder="Enter Email Address"
          type="text"
          name="email"
          :error="error && error.email"
          :disabled="true"
          :validation-msg="validationMsg($v.formData.email)"
          :model-value="formData.email"
          @update:modelValue="(value) => (formData.email = value)"
        />
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
      </div>

      <div class="s-flex s-flex-col s-w-full sm:s-flex-row s-gap-0 sm:s-gap-7">
        <Select
          class="s-w-full sm:s-w-1/2"
          label="Gender"
          name="Gender"
          :options="selectGender"
          :value="formData.gender"
          :error="error && error.gender"
          :validation-msg="validationMsg($v.formData.gender)"
          @update="(value) => (formData.gender = value)"
        />

        <Date
          class="s-w-full sm:s-w-1/2"
          label="Date of Birth"
          :model-value="formData.dob"
          :error="error && error.dob"
          :validation-msg="validationMsg($v.formData.dob)"
          @update:modelValue="(value) => (formData.dob = value)"
        />
      </div>

      <section class="s-mt-8 s-w-full">
        <h2
          class="s-font-bold s-text-[0.87rem] s-leading-[1.375rem] s-mb-[1.375rem] s-text-[#222228]"
        >
          YOUR ADDRESS
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
          class="s-flex s-flex-col s-w-full sm:s-flex-row s-gap-0 sm:s-gap-7"
        >
          <TextField
            class="s-w-full sm:s-w-1/2"
            label="Landmark"
            placeholder="Enter Landmark"
            type="text"
            name="landmark"
            :model-value="formData.landmark"
            :error="error && error.landmark"
            :validation-msg="validationMsg($v.formData.landmark)"
            @update:modelValue="(value) => (formData.landmark = value)"
          />

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

        <div
          class="s-flex s-flex-col s-w-full sm:s-flex-row sm:s-mb-2.5 sm:s-space-x-6 lg:s-space-x-8"
        >
          <CountrySelectorPackage
            label="Select country"
            class="s-w-full sm:s-w-1/2"
            :value="formData.countryCode"
            :error="error && error.country"
            :validation-msg="validationMsg($v.formData.country)"
            @updateCountry="
              (value) => (
                (formData.country = value?.name),
                (formData.countryCode = value?.isoCode)
              )
            "
          />
        </div>
      </section>
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
import { formattedDate } from '../../helpers/utils'

const formMessages = {
  firstNameRequired: () => 'First Name is required',
  lastNameRequired: () => 'Last Name is required',
  phoneRequired: () => 'Phone number is required',
  emailRequired: () => 'Email is required',
  dobRequired: () => 'Date of birth is required',
  genderRequired: () => 'Gender is required',
  addressRequired: () => 'address is required',
  landmarkRequired: () => 'Landmark is required',
  countryRequired: () => 'Country is required',
  stateRequired: () => 'State is required',
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
        dob: '',
        gender: '',
        address: '',
        landmark: '',
        state: '',
        country: '',
        countryCode: '',
        photo: null,
      },
      formattedPhoneNumber: '',
      error: null,
      loading: false,
      selectedImage: [],
      preview: null,
      image: null,
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
    ...mapActions('util', ['imageUpload']),
    validationMsg: validationMessage(formMessages),
    scrolltoTop() {
      window.scrollTo(0, 0)
    },

    previewImage(event) {
      this.selectedImage = this.$refs.fileInput.files[0]

      const input = event.target
      if (input.files) {
        const reader = new FileReader()
        reader.onload = (e) => {
          this.preview = e.target.result
        }
        this.image = input.files[0]
        reader.readAsDataURL(input.files[0])
      }

      this.onChangeProfile()
    },

    onPickFile() {
      this.$refs.fileInput.click()
    },
   
    async onChangeProfile() {
      this.loading = true
      const preset = this.$config.cloudinaryPreset
      const formData = new FormData()
      formData.append('file', this.selectedImage)
      formData.append('upload_preset', preset)

      try {
        if(formData.photo){
          const publicId  = formData.photo.split('.');
          await this.deleteCloudinaryImage(publicId[0])
        }
        const response = await this.imageUpload(formData)
        this.formData.photo = response.url
        this.loading = false
      } catch (error) {
        this.loader = false
        this.$errorHandler(error)
      }
      
    },

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
    updateForm() {
      if (this.userData && this.userData.kyc) {
        const {
          firstname,
          lastname,
          gender,
          country,
          state,
          address,
          landmark,
          dob,
          photo
        } = this.userData.kyc
        const { email } = this.userData.user
        this.formData.firstname = firstname
        this.formData.lastname = lastname
        this.formData.email = email
        this.formData.gender = gender
        this.formData.country = country
        this.formData.dob = dob
        this.formData.countryCode = 'NG'
        this.formData.state = state
        this.formData.address = address
        this.formData.landmark = landmark
        this.formData.photo = photo
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
          dob: this.formatDate(this.formData.dob),
        }
        delete data.firstname
        delete data.email
        delete data.lastname
        try {
          const response = await this.addDoc(data)
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
