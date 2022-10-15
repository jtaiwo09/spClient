export const state = () => ({
  hostDashboard: {},
  hostSubscriptions: {},
  hostBookings: {},
  loader: false,
})

export const getters = {}
export const actions = {
  async getHostSubscriptions({ commit }, { page, limit }) {
    let response
    if (page) {
      response = await this.$axios.get(
        `subscriptions/get-host-apartment-subscriptions?page=${page}&limit=${limit}`
      )
    } else {
      response = await this.$axios.get(
        `subscriptions/get-host-apartment-subscriptions`
      )
    }
    if (response.data.statusCode === 200) {
      commit('SET_HOST_SUBSCRIPTIONS', response.data.data)
    }

    return response
  },
  async getHostBookings({ commit }, { page, limit }) {
    let response
    if (page) {
      response = await this.$axios.get(
        `property/booking/get-host-bookings?page=${page}&limit=${limit}`
      )
    } else {
      response = await this.$axios.get(`property/booking/get-host-bookings`)
    }
    if (response.data.statusCode === 200) {
      commit('SET_HOST_BOOKINGS', response.data.data)
    }

    return response
  },
  async getHostDashboard({ commit }) {
    const response = await this.$axios.get('dashboards/hosts')
    if (response.data.statusCode === 200) {
      commit('HOST_DASHBOARD', response.data.data)
    }
    return response
  },

  async getHostRemittance() {
    const response = await this.$axios.get('payments/get-settlement-history')
    return response
  },

  async getSingleRemittance(_, invoiceId) {
    const response = await this.$axios.get(
      `payments/get-settlement-history/${invoiceId}`
    )
    return response
  },

  async acceptBooking(_, id) {
    const response = await this.$axios.patch(
      `property/booking/accept-booking/${id}`
    )
    return response
  },

  async declineBooking(_, payload) {
    const response = await this.$axios.patch(
      `property/booking/reject-booking/${payload.id}`,
      { reject_reason: payload.allReason }
    )
    return response
  },
  async getSetup() {
    const response = await this.$axios.get('subscriptions/get-setup/')
    return response
  },
  async hostAddExtraCharge(_, payload) {
    const response = await this.$axios.post(
      'subscriptions/add-extra-charge',
      payload
    )
    return response
  },
  async hostEditExtraCharge(_, { extraChargeData, id }) {
    const response = await this.$axios.patch(
      `subscriptions/edit-extra-charge/${id}`,
      extraChargeData
    )
    return response
  },
  async deleteHostExtraCharge(_, { extraChargeData, id }) {
    const response = await this.$axios.patch(
      `subscriptions/delete-extra-charge/${id}`,
      extraChargeData
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
  SET_HOST_SUBSCRIPTIONS: (state, data) => {
    state.hostSubscriptions = data
  },
  SET_HOST_BOOKINGS: (state, data) => {
    state.hostBookings = data
  },
  HOST_DASHBOARD: (state, data) => {
    state.hostDashboard = data
  },
}
