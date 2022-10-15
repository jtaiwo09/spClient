<template>
  <div class="s-relative s-h-screen">
    <WebsiteAuthNavbar />
    <SuccessModal
      show-button
      resend
      :loading="loading"
      :show-icon="false"
      :data="mailSentInfo"
      @submit="verifyEmail"
    />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data() {
    return {
      callbackUrl: this.$config.emailVerificationPage,
      email: '',
      loading: false,
    }
  },
  computed: {
    mailSentInfo() {
      return {
        title: 'Not Verified',
        subTitle:
          'Hey there! Your email is not verified. Kindly check your email for verification link or click the button below to resend verification link',
        link: 'index',
        linkText: 'Back to Homepgae',
        btnText: 'Resend Link',
      }
    },
  },
  mounted() {
    this.getEmail()
  },
  methods: {
    ...mapActions('auth', ['resendEmailVerifyLink']),
    getEmail() {
      const email = JSON.parse(localStorage.getItem('email'))
      this.email = email
    },
    verifyEmail() {
      this.loading = true
      this.resendEmailVerifyLink({
        email: this.email,
        callbackUrl: this.callbackUrl,
      })
        .then((response) => {
          this.loading = false
          if (response.message === 'Verification mail successfully sent') {
            this.$router.push({ name: 'email-verification' })
          }
          return response
        })
        .catch((error) => {
          this.loading = false
          this.$errorHandler(error, 'error')
          return error
        })
    },
  },
}
</script>

<style></style>
