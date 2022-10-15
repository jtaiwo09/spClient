import jwtDecode from 'jwt-decode'
export const strict = false

const decodedToken = (token) => {
  const decoded = jwtDecode(token)
  const roles = []
  decoded.roles.forEach((el) => {
    roles.push({ status: el.status, userType: el.role.name })
  })
  const user = {
    roles,
    userId: decoded.userId,
    token,
  }
  return user
}

export const state = () => ({
  isLoggedIn: false,
})

export const mutations = {
  LOGGED_IN_SUCCESS: (state, data) => {
    state.isLoggedIn = data
  },
}

export const actions = {
  async login({ commit }, payload) {
    const response = await this.$axios.$post('auth/login', payload)

    if (response.statusCode === 200) {
      const user = decodedToken(response.data.token)
      this.$cookies.set('user', user, {
        domain: this.$config.domain,
        path: '/',
      })
      commit('LOGGED_IN_SUCCESS', true)
    }
    return response
  },
  async signup(_, payload) {
    const response = await this.$axios.$post('auth/signup', payload)
    return response
  },
  async googleAuth({ commit }, payload) {
    const response = await this.$axios.$post('auth/google', payload)
    const urlParams = new URLSearchParams(window.location.search)
    const redirect = urlParams.get('redirect')
    if (response.statusCode === 201) {
      const user = decodedToken(response.data.token)
      this.$cookies.set('user', user, {
        domain: this.$config.domain,
        path: '/',
      })
      commit('LOGGED_IN_SUCCESS', true)
    }

    return { response, redirect }
  },
  async forgotPassword(_, payload) {
    const response = await this.$axios.$post('auth/password-reset', payload)
    return response
  },
  async resetPassword(_, { token, password }) {
    const response = await this.$axios.$put(`auth/password-reset/${token}`, {
      password,
    })
    return response
  },
  async verifyEmail(_, { token }) {
    const response = await this.$axios.$get(`auth/email/verification/${token}`)
    return response
  },
  async resendEmailVerifyLink(_, payload) {
    const response = await this.$axios.$post(
      'auth/email/verification-resend',
      payload
    )
    return response
  },
  async setNewRole(_, role) {
    const response = await this.$axios.$patch(`auth/roles/${role}`)

    if (response.data.statusCode === 200) {
      const user = decodedToken(response.data.token)
      this.$cookies.set('user', user, {
        domain: this.$config.domain,
        path: '/',
      })
    }
    return response
  },
}
