<template>
  <div>
    <Loading v-if="loader" />
    <div v-else class="s-relative s-h-screen">
      <WebsiteAuthNavbar />
      <SuccessModal :data="data" />
    </div>
  </div>
</template>

<script>
import jwtDecode from 'jwt-decode'
import { mapActions } from 'vuex'
export default {
  data() {
    return {
      domain: this.$config.domain,
      token: this.$route.params.id,
      verified: null,
      alreadyVerified: null,
      role: null,
      loader: false,
    }
  },
  computed: {
    data() {
      if (this.verified) {
        return {
          title: 'Verified',
          subTitle:
            'We’ve sent a verification link to your email. Please click the link to continue.',
          link: 'index',
          linkText: 'Continue',
        }
      } else if (this.alreadyVerified) {
        return {
          title: 'You are already verified!',
          subTitle:
            'We’ve sent a verification link to your email. Please click the link to continue.',
          link: 'host',
          linkText: 'Go to Dashboard',
        }
      }
      return {}
    },
  },
  mounted() {
    this.verify()
  },
  methods: {
    ...mapActions('auth', ['verifyEmail']),
    async verify() {
      this.loader = true
      try {
        const response = await this.verifyEmail({ token: this.token })
        this.loader = false
        this.verified = true
        if (response.data.token) {
          const token = response.data.token
          const decoded = jwtDecode(token)
          const user = {
            role: decoded.role,
            userId: decoded.userId,
            token,
          }
          const roles = Object.keys(decoded.role)
          roles.forEach((role) => {
            if (role === 'host') {
              this.role = 'host'
            }
          })

          this.$cookies.set('user', user, {
            domain: this.domain,
            path: '/',
          })

          localStorage.removeItem('newUser')
          localStorage.removeItem('email')
        }
      } catch (error) {
        this.loader = false
        if (
          error.response.data.message === 'User already verified' ||
          error.response.data.message === 'Unauthorized user'
        ) {
          this.alreadyVerified = true
        }
        this.$errorHandler(error, 'error')
      }
    },
  },
}
</script>
