<template>
  <div>
    <WebsiteAuthNavbar />
    <div class="s-px-7 s-pb-5 lg:pb-0">
      <div
        class="s-max-w-[29.188rem] s-w-full s-borde-none sm:s-border-solid sm:s-border sm:s-border-[#B1B7D6] sm:s-py-12 s-mt-8 s-mx-auto s-rounded-xl"
      >
        <div
          class="sm:s-mx-8 md:s-mx-10 lg:s-mx-12 sm:s-pb-6 s-mb-7 sm:s-border-solid sm:s-border-b sm:s-border-b-[#b1b7d6]/[0.19]"
        >
          <h2
            class="s-mb-2 s-text-center s-text-2xl s-leading-[1.938rem] s-font-bold"
          >
            Welcome Back
          </h2>
          <p
            class="s-mb-6 s-text-sm s-font-normal s-leading-[1.125rem] s-text-center"
          >
            Sign into your Spleet account to continue
          </p>
          <button
            v-google-signin-button="clientId"
            class="s-flex s-items-center s-text-sm s-leading-[1.125rem] s-font-semibold s-justify-center s-w-full s-py-3.5 s-border s-rounded-full s-border-solid s-border-[#55509f]/[0.19]"
            @click="googleLoader = true"
          >
            <GoogleIcon :class="'s-mr-2'" />
            <span class="google__wrap-text s-mr-2">
              {{
                googleLoader ? 'Authenticating' : 'Continue With Google '
              }}</span
            >
            <Loader v-if="googleLoader" fill="#B0BCFF" width="18" height="18" />
          </button>
        </div>
        <form class="sm:s-mx-8 md:s-mx-10 lg:s-mx-12" @submit.prevent="submit">
          <TextField
            label="Email address"
            placeholder="Enter your email address"
            type="email"
            icon="MessageIcon"
            :error="error && error.email"
            name="email"
            :validation-msg="validationMsg($v.formData.email)"
            :model-value="formData.email"
            @update:modelValue="(value) => (formData.email = value)"
          />
          <TextField
            :class="'!s-mb-0'"
            label="Password"
            placeholder="Enter your password"
            type="password"
            icon="LockIcon"
            :error="error && error.password"
            name="password"
            :validation-msg="validationMsg($v.formData.password)"
            :model-value="formData.password"
            @update:modelValue="(value) => (formData.password = value)"
          />
          <nuxt-link
            :to="{ name: 'reset-password' }"
            class="s-mt-2 s-text-right s-block s-font-normal s-text-sm s-leading-[1.125rem] s-text-primary-light"
            >Forgot password?</nuxt-link
          >
          <Button
            :class="'s-bg-[#2E48DA] s-text-[#fff] s-w-full s-mt-6'"
            :loading="loading"
            type="submit"
            text="Sign In"
            @submit="submit"
          >
          </Button>
          <p
            class="form__header-sub s-text-sm s-leading-[1.125rem] s-mt-6 s-text-center s-text-primary-light"
          >
            New To Spleet?
            <nuxt-link
              class="s-text-primary-blue s-font-normal hover:s-text-primary-blue"
              :to="{ name: 'create-account' }"
              >Sign Up</nuxt-link
            >
          </p>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import GoogleSignInButton from 'vue-google-signin-button-directive'
import { required, email } from 'vuelidate/lib/validators'
import { validationMessage } from 'vuelidate-messages'

const formMessages = {
  emailRequired: () => 'Email is required',
  passwordRequired: () => 'Password is required',
  email: () => 'Must be a valid email',
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
      },
      loading: false,
      googleLoader: false,
      noAccount: false,
      clientId: this.$config.googleClientId,
      error: null,
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
      },
    },
  },
  mounted() {
    localStorage.removeItem('userToken')
    localStorage.removeItem('userCode')
  },
  methods: {
    ...mapActions('auth', ['login', 'googleAuth']),
    validationMsg: validationMessage(formMessages),
    async submit() {
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.error = this.$v.formData
      } else {
        this.loading = true
        try {
          const response = await this.login(this.formData)
          this.loading = false
          if (response.statusCode === 200) {
            this.$showToast(response.message, 'success')
            localStorage.removeItem('newUser')
            localStorage.removeItem('email')
            const { redirect } = this.$route.query
            if (redirect) {
              window.location = redirect
            } else {
              window.location = '/'
            }
          }
        } catch (error) {
          this.loading = false
          localStorage.setItem('email', JSON.stringify(this.formData.email))
          if (error.response.data.message === 'Email not verified') {
            this.$router.push({ name: 'email-notverified' })
            return
          }
          this.$showToast(error.response.data.message, 'error')
        }
      }
    },
    async OnGoogleAuthSuccess(idToken) {
      try {
        const { response, redirect } = await this.googleAuth({
          idToken,
          userType: 'member',
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
  },
}
</script>
