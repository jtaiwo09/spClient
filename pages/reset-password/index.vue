<template>
  <div class="s-h-screen s-w-full">
    <WebsiteAuthNavbar />
    <SuccessModal v-if="success" :data="mailSentInfo" />
    <div
      v-else
      class="s-max-w-[29.188rem] s-min-h-[27.438rem] sm:s-rounded-xl sm:s-border sm:s-border-[#B1B7D6] sm:s-border-solid s-mx-auto s-mt-8 s-px-[1.875rem] s-pt-10"
    >
      <div
        class="sm:s-border-b sm:s-border-[#b1b7d6]/[0.19] sm:s-border-solid sm:s-pb-8 s-mb-8"
      >
        <h2 class="title s-text-center">Forgot Password?</h2>
        <p class="sub-title s-max-w-[17.625rem] s-text-center s-mx-auto">
          No worries, we’ll send you reset instructions.
        </p>
      </div>
      <div class="sm:s-px-5">
        <TextField
          :class="'!s-mb-10'"
          label="Email"
          placeholder="Enter your email address"
          type="email"
          icon="MessageIcon"
          :error="error && error.email"
          name="email"
          :validation-msg="validationMsg($v.email)"
          :model-value="email"
          @update:modelValue="(value) => (email = value)"
        />
        <Button
          text="Reset Password"
          :loading="loading"
          type="click"
          :class="'s-bg-primary-blue s-w-full'"
          @submit="submit"
        />
        <NuxtLink
          class="s-flex s-items-center s-mt-7 s-max-w-fit s-mx-auto"
          to="/login"
        >
          <div
            class="s-w-[1.188rem] s-h-[1.188rem] s-flex s-items-center s-mr-2.5 s-justify-center s-rounded-full s-border s-border-solid s-border-[#5C5A77]"
          >
            <CollapseIcon :fill="'none'" />
          </div>
          <p class="sub-title">Back to log in</p>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators'
import { mapActions } from 'vuex'
import { validationMessage } from 'vuelidate-messages'

const formMessages = {
  emailRequired: () => 'Email is required',
  email: () => 'Must be a valid email',
}
export default {
  data() {
    return {
      email: '',
      error: null,
      loading: false,
      success: false,
      callbackUrlResetPassword: this.$config.forgetPasswordPage,
    }
  },
  validations: {
    email: {
      emailRequired: required,
      email,
    },
  },
  computed: {
    mailSentInfo() {
      return {
        title: 'We’ve sent you an email',
        subTitle:
          'Click the link we’ve sent to your email. If you don’t see it, please be sure to check your spam folder.',
        link: 'login',
        linkText: 'Back to Login',
      }
    },
  },
  mounted() {
    this.email = JSON.parse(localStorage.getItem('email'))
  },
  methods: {
    ...mapActions('auth', ['forgotPassword']),
    validationMsg: validationMessage(formMessages),
    submit() {
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.error = this.$v
      } else {
        this.loading = true
        this.forgotPassword({
          email: this.email,
          callbackUrl: this.callbackUrlResetPassword,
        })
          .then((response) => {
            this.loading = false
            if (response.statusCode === 200) {
              this.success = true
            }
          })
          .catch((error) => {
            this.loading = false
            this.$showToast(error.response.data.message, 'error')
          })
      }
    },
  },
}
</script>

<style></style>
