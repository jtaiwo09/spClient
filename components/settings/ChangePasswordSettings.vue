<template>
  <div class="s-flex s-flex-col s-h-[90%] sm:s-h-full">
    <div class="s-max-w-[40rem] s-mx-5 s-mt-4">
      <p class="s-font-[700] s-text-[14px] s-mb-5">CHANGE PASSWORD</p>

      <div class="s-max-w-[20rem]">
        <TextField
          :class="'s-mr-6 md:s-mr-8 s-w-full s-mb-4'"
          placeholder="Password"
          type="password"
          name="currentPassword"
          :error="error && error.currentPassword"
          :validation-msg="validationMsg($v.formData.currentPassword)"
          :model-value="formData.currentPassword"
          @update:modelValue="(value) => (formData.currentPassword = value)"
        />
        <TextField
          :class="'s-mr-6 md:s-mr-8 s-w-full'"
          placeholder="New Password"
          type="password"
          name="newPassword"
          :error="error && error.newPassword"
          :validation-msg="validationMsg($v.formData.newPassword)"
          :model-value="formData.newPassword"
          @update:modelValue="(value) => (formData.newPassword = value)"
        />
      </div>

      <div class="border-container">
        <Button
        text="Change Password"
        :class="'s-bg-primary-blue s-text-white s-py-3 s-w-full sm:s-w-40'"
        :loading="loading"
        @submit="updateProfile"
      />

      <!-- <p class="s-text-[#D3052A] s-text-[17px] s-font=[600] s-pt-5">Deactivate your account?</p> -->
      </div>
    </div>

  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
import { validationMessage } from 'vuelidate-messages'
import { mapActions } from 'vuex'

const formMessages = {
  currentPasswordRequired: () => 'Current password is required',
  newPasswordRequired: () => 'New password is required',
}
export default {
  name: 'Profile',
  data() {
    return {
      formData: {
        currentPassword: '',
        newPassword: '',
      },
      error: null,
      loading: false,
    }
  },
  validations() {
    return {
      formData: {
        currentPassword: {
          currentPasswordRequired: required,
        },
        newPassword: {
          newPasswordRequired: required,
        },
      },
    }
  },
  computed: {

  },
  watch: {

  },
  mounted() {
  },
  methods: {
    ...mapActions('user', ['changePassword']),
    validationMsg: validationMessage(formMessages),
    scrolltoTop() {
      window.scrollTo(0, 0)
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
          callbackUrl: `${process.env.baseNwURL}reset-password`
        }
        try {
          const response = await this.changePassword(data)
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

<style lang="scss" scoped>
  .border-container {
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    padding-top: 20px;
  }
</style>
