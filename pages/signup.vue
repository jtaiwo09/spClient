<template>
  <div>
    <WebsiteAuthNavbar />
    <div class="s-px-7 s-pb-5 lg:pb-0">
      <div
        class="s-max-w-[51.25rem] s-w-full s-borde-none sm:s-border-solid sm:s-border sm:s-border-[#B1B7D6] sm:s-py-12 s-mt-4 s-mx-auto s-rounded-xl"
      >
        <div
          class="sm:s-mx-8 md:s-mx-10 lg:s-mx-12 sm:s-pb-6 s-mb-7 sm:s-border-solid sm:s-border-b sm:s-border-b-[#b1b7d6]/[0.19]"
        >
          <h2
            class="s-mb-2 s-text-center s-text-2xl s-leading-[1.938rem] s-font-bold"
          >
            Become a Spleet host
          </h2>
          <p
            class="s-mb-6 s-text-sm s-font-normal s-leading-[1.125rem] s-text-center"
          >
            Let’s get you onboard. It’s easy
          </p>
          <button
            v-google-signin-button="clientId"
            class="s-flex s-items-center s-text-sm s-leading-[1.125rem] s-font-semibold s-justify-center s-w-full s-py-3.5 s-border s-rounded-full s-border-solid s-border-[#55509f]/[0.19]"
            @click="googleLoader = true"
          >
            <GoogleIcon :class="'s-mr-2'" />
            <span class="s-mr-2">
              {{
                googleLoader ? 'Authenticating' : 'Continue With Google '
              }}</span
            >
            <Loader v-if="googleLoader" fill="#B0BCFF" width="18" height="18" />
          </button>
        </div>
        <form class="sm:s-mx-8 md:s-mx-10 lg:s-mx-12">
          <div class="s-flex s-flex-col s-w-full sm:s-mr-8 sm:s-flex-row">
            <TextField
              :class="'s-mr-8 s-w-full'"
              label="First name"
              placeholder="Enter First Name"
              type="text"
              icon="UserIcon"
              name="firstname"
              :error="error && error.firstname"
              :validation-msg="validationMsg($v.formData.firstname)"
              :model-value="formData.firstname"
              @update:modelValue="(value) => (formData.firstname = value)"
            />
            <TextField
              :class="'s-w-full'"
              label="Last name"
              placeholder="Enter Last Name"
              type="text"
              icon="UserIcon"
              name="lastname"
              :error="error && error.lastname"
              :validation-msg="validationMsg($v.formData.lastname)"
              :model-value="formData.lastname"
              @update:modelValue="(value) => (formData.lastname = value)"
            />
          </div>
          <div class="s-flex s-flex-col s-w-full sm:s-flex-row">
            <TextField
              :class="'s-mr-8 s-w-full'"
              label="Email address"
              placeholder="Enter your email address"
              type="email"
              icon="MessageIcon"
              name="email"
              :error="error && error.email"
              :validation-msg="validationMsg($v.formData.email)"
              :model-value="formData.email"
              @update:modelValue="(value) => (formData.email = value)"
            />
            <TextField
              :class="'s-w-full'"
              label="Password"
              placeholder="Enter your password"
              type="password"
              icon="LockIcon"
              name="password"
              :error="error && error.password"
              :validation-msg="validationMsg($v.formData.password)"
              :model-value="formData.password"
              @update:modelValue="(value) => (formData.password = value)"
            />
          </div>
          <Button
            :class="'s-bg-[#2E48DA] s-text-[#fff] s-w-full sm:s-mt-4'"
            :loading="loading"
            type="button"
            text="Sign Up"
            @submit="submit"
          >
          </Button>
          <p
            class="s-text-sm s-leading-[1.125] s-mt-5 s-text-center s-text-primary-light"
          >
            Have an account?
            <nuxt-link
              class="s-text-primary-blue s-font-normal hover:s-text-primary-blue"
              :to="{ name: 'login' }"
              >Sign In</nuxt-link
            >
          </p>
        </form>
      </div>
      <p class="s-text-xs s-mt-5 s-text-center s-text-[#5C5A77]">
        By signing up, you agree to our
        <nuxt-link
          class="s-text-[#2E48DA] s-font-normal hover:s-text-[#2E48DA]"
          to="#"
          >Terms and Privacy Policy.</nuxt-link
        >
      </p>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import GoogleSignInButton from 'vue-google-signin-button-directive'
import { required, email, helpers, minLength } from 'vuelidate/lib/validators'
import { validationMessage } from 'vuelidate-messages'

const passwordCheck = helpers.regex(
  'password',
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
)

const formMessages = {
  emailRequired: () => 'Email is required',
  passwordRequired: () => 'Password is required',
  firstnameRequired: () => 'Firstname is required',
  lastnameRequired: () => 'Lastname is required',
  email: () => 'Must be a valid email',
  passwordCheck: () =>
    'Password must contain atleast one uppercase, one number, one special character, and minimum of 8 characters e.g Abcd123@',
  pwdLength: ({ $params }) =>
    `Must be at least ${$params.pwdLength.min} characters.`,
}

export default {
  directives: {
    GoogleSignInButton,
  },
  middleware: 'auth',
  data() {
    return {
      formData: {
        email: '',
        password: '',
        firstname: '',
        lastname: '',
      },
      loading: false,
      googleLoader: false,
      weakPassword: false,
      error: null,
      callbackUrl: this.$config.emailVerificationPage,
      callbackUrlResetPassword: this.$config.forgetPasswordPage,
      clientId: this.$config.googleClientId,
    }
  },
  validations: {
    formData: {
      email: {
        emailRequired: required,
        email,
      },
      password: {
        passwordRequired: required,
        pwdLength: minLength(8),
        passwordCheck,
      },
      firstname: {
        firstnameRequired: required,
      },
      lastname: {
        lastnameRequired: required,
      },
    },
  },
  computed: {
    ...mapState('user', ['role']),
  },
  mounted() {
    if (this.role === null) {
      this.$router.push({ name: 'create-account' })
    }
  },
  methods: {
    ...mapActions('auth', ['signup', 'googleAuth', 'forgotPassword']),
    validationMsg: validationMessage(formMessages),
    async submit() {
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.error = this.$v.formData
      } else {
        this.loading = true
        const formData = {
          ...this.formData,
          callbackUrl: this.callbackUrl,
          userType: this.role,
        }

        try {
          const response = await this.signup(formData)
          this.loading = false
          if (response.statusCode === 201) {
            if (response.data.token) {
              this.loading = false
              this.$showToast(response.message, 'success')
              localStorage.setItem('newUser', JSON.stringify(response.data))
              localStorage.setItem('email', JSON.stringify(this.formData.email))
              this.$router.push({ name: 'email-verification' })
            }
          }
        } catch (error) {
          this.loading = false
          if (error.response.data.statusCode === 409) {
            this.resetPassword()
            this.$router.push({ name: 'email-exist' })
            return
          }
          this.$showToast(error.response.data.message, 'error')
          return error
        }
      }
    },
    async OnGoogleAuthSuccess(idToken) {
      try {
        const { response, redirect } = await this.googleAuth({
          idToken,
          userType: this.role,
        })
        this.googleLoader = false
        if (response.statusCode === 201) {
          this.$showToast(response.message, 'success')
          if (redirect) {
            window.location = redirect
          } else {
            window.location = '/'
          }
        }
      } catch (error) {}
    },
    OnGoogleAuthFail() {
      this.googleLoader = false
      this.$showToast(
        'Error completing request. Please try again later',
        'error'
      )
    },
    async resetPassword() {
      try {
        this.loading = true
        await this.forgotPassword({
          email: this.email,
          callbackUrl: this.callbackUrlResetPassword,
        })
        this.loading = false
      } catch (error) {
        this.loading = false
        return error
      }
    },
  },
}
</script>
