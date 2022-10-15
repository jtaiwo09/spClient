export const state = () => ({
  loader: false,
  userBookings: {},
  userSubscriptions: null,
  cards: null,
})

export const getters = {
  getBookings: (state) => {
    if (state.userBookings.length) {
      return state.userBookings.bookings
    }
  },
}

export const actions = {
  async getMemberDashboardInfo({ commit }) {
    commit('SET_LOADER', true)
    const response = await this.$axios.get('dashboards/members')

    commit('SET_LOADER', false)
    return response
  },
  async getUserBookings({ commit }, { page, limit }) {
    commit('SET_LOADER', true)
    let response
    if (page) {
      response = await this.$axios.get(
        `property/booking/get-user-bookings?page=${page}&limit=${limit}`
      )
    } else {
      response = await this.$axios.get(`property/booking/get-user-bookings`)
    }

    if (response.data.statusCode === 200) {
      commit('SET_USER_BOOKINGS', response.data.data)
    }
    commit('SET_LOADER', false)
    return response
  },
  async getUserSubscriptions({ commit }, { page, limit }) {
    commit('SET_LOADER', true)
    let response
    if (page) {
      response = await this.$axios.get(
        `subscriptions/get-user-apartment-subscriptions?page=${page}&limit=${limit}`
      )
    } else {
      response = await this.$axios.get(
        `subscriptions/get-user-apartment-subscriptions`
      )
    }
    if (response.data.statusCode === 200) {
      commit('SET_USER_SUBSCRIPTIONS', response.data.data)
    }
    commit('SET_LOADER', false)
    return response
  },
  async getCards({ commit }) {
    const response = await this.$axios.get('users/card')
    if (response.data.statusCode === 200) {
      commit('UPDATE_CARD', response.data.data)
    }
    return response
  },
  async addCard(_, payload) {
    const response = await this.$axios.post('users/card', payload)
    return response
  },
  async deleteCard(_, id) {
    const response = await this.$axios.delete(`users/card/${id}`)
    return response
  },
  async deleteBank(_, id) {
    const response = await this.$axios.delete(`users/banks/accounts/${id}`)
    return response
  },
  async mainCard(_, id) {
    const response = await this.$axios.patch(`users/card/${id}`)
    return response
  },
  async getBanks(_, countryCode) {
    const response = await this.$axios.get(`users/banks/${countryCode}`)
    return response
  },
  async getPaymentRecord() {
    const response = await this.$axios.get(`payments/get-payment-history`)
    return response
  },
  async addBankAccount(_, payload) {
    const response = await this.$axios.post('users/banks/accounts', payload)
    return response
  },
  async getBankAccounts() {
    const response = await this.$axios.get('users/banks/accounts')
    return response
  },
  async getSingleHistory(_, invoiceId) {
    const response = await this.$axios.get(
      `payments/get-payment-history/${invoiceId}`
    )
    return response
  },
  async verifyAccount(_, payload) {
    const response = await this.$axios.post(
      'users/banks/accounts/verify',
      payload
    )
    return response
  },
  async addMobileMoney(_, payload) {
    const response = await this.$axios.post(
      'users/banks/add-mobile-money',
      payload
    )
    return response
  },
  async cancelSubcription(_, id) {
    const response = await this.$axios.patch(
      `subscriptions/cancel-apartment-subscription/${id}`
    )
    return response
  },
  async renewUserSubcription(_, { id, data }) {
    const response = await this.$axios.patch(
      `subscriptions/renew-apartment-subscriptions/${id}`,
      data
    )
    return response
  },
  async getSubscriptionDetail(_, id) {
    const response = await this.$axios.get(
      `subscriptions/get-apartment-subscription-detail/${id}`
    )
    return response
  },
}

export const mutations = {
  SET_LOADER: (state, data) => {
    state.loader = data
  },
  SET_USER_BOOKINGS: (state, data) => {
    state.userBookings = data
  },
  SET_USER_SUBSCRIPTIONS: (state, data) => {
    state.userSubscriptions = data
  },
  UPDATE_CARD: (state, data) => {
    state.cards = data
  },
}
