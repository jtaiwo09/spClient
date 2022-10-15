export const strict = false

export const state = () => ({
  userData: null,
  loader: false,
  role: null,
  location: { flag: 'nigeria.svg', text: 'Nigeria', path: '/' },
})

export const mutations = {
  SET_USER_DATA: (state, data) => {
    state.userData = data
  },
  UPDATE_ROLE: (state, message) => {
    state.role = message
  },
  SET_LOADER: (state, data) => {
    state.loader = data
  },
}

export const actions = {
  async getUser({ commit }) {
    commit('SET_LOADER', true)
    const response = await this.$axios.$get('users/profile')
    commit('SET_LOADER', false)

    const user = this.$cookies.get('user')
    if (response.statusCode === 200) {
      commit('SET_USER_DATA', response.data)
      commit('UPDATE_ROLE', user?.roles)
    }
    return response
  },
  async userAlternativeContact(_, payload) {
    const response = await this.$axios.put(
      'users/profile/alternative-contact',
      payload
    )
    return response
  },
  async addDoc(_, payload) {
    const response = await this.$axios.patch('users/profile/kyc', payload)
    return response
  },
  async updateEmployementDetails(_, payload) {
    const response = await this.$axios.put('users/profile/employment-details', payload)
    return response
  },

  async updateAlternativeContact(_, payload) {
    const response = await this.$axios.put('users/profile/alternative-contact', payload)
    return response
  },

  async updateNextOfKin(_, payload) {
    const response = await this.$axios.put('users/profile/next-of-kin', payload)
    return response
  },

  async updateGuarantorInfo(_, payload) {
    const response = await this.$axios.put('users/profile/guarantor', payload)
    return response
  },

  async changePassword(_, payload) {
    const response = await this.$axios.put('auth/password-change', payload)
    return response
  }
}

export const getters = {
  userData: (state) => state.userData,
  userFullname: (state) => {
    if (state.userData !== null) {
      return `${state.userData.kyc.firstname} ${state.userData.kyc.lastname}`
    } else return null
  },
  userEmail: (state) => state.userData?.user.email,
  userPhoto: (state) => state.userData?.kyc.photo,
  userPhoneNumber: (state) => state.userData?.kyc.phone,
}
