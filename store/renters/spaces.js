export const state = () => ({
  spaces: [],
  total: 0,
  totalPages: 0,
})

export const mutations = {
  SET_SPACES: (state, data) => {
    state.spaces = data
  },
  SET_TOTAL: (state, data) => {
    state.total = data
  },
  SET_TOTAL_PAGE: (state, data) => {
    state.totalPages = data
  },
}

export const actions = {
  async getSpaces({ commit }, payload) {
    try {
      const response = await this.$axios.$get(`property/listing/search`, {
        params: {
          ...payload,
        },
      })
      if (response.statusCode === 200) {
        commit('SET_SPACES', response.data.apartments)
        commit('SET_TOTAL', response.data.total_rec)
        commit('SET_TOTAL_PAGE', response.data.no_of_Pages)
      }
    } catch (error) {
      this.$errorHandler(error)
    }
  },
  async getSpaceDetail(_, listingId) {
    const response = await this.$axios.$get(
      `property/listing/apartment/${listingId}`
    )
    return response
  },
  async getPrcBreakdown(
    _,
    { listingId, apartmentId, subType, subPlan, endDate, startDate, currency }
  ) {
    const params = new URLSearchParams()
    params.append('property_listing_id', listingId)
    params.append('apartment_id', apartmentId)
    params.append('booking_type', subType)
    params.append('sub_plan', subPlan)
    params.append('end_date', endDate)
    params.append('start_date', startDate)
    params.append('currency', currency)

    const response = await this.$axios.$get(
      'property/booking/get-booking-charges',
      { params }
    )
    return response
  },
  async createUserBooking(_, payload) {
    const response = await this.$axios.$post(
      'property/booking/create-booking',
      payload
    )
    return response
  },
  async userViewBooking(_, payload) {
    const response = await this.$axios.$post(
      'property/listing/viewings',
      payload
    )
    return response
  },
}
