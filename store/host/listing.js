const propertyId = JSON.parse(localStorage.getItem('propertyId'))
const addDiscount = localStorage.getItem('addDiscount') === 'true'
export const state = () => ({
  currentLevel: null,
  step: null,
  propertySetUp: null,
  propertyListingId: propertyId,
  loader: false,
  rooms: [],
  listingType: null,
  listedSpace: {},
  subPlan: null,
  subArray: [],
  singleListedSpace: {},
  addDiscount,
})
export const getters = {
  allListedSpace: (state) => state.listedSpace,
  singleListedSpace: (state) => state.singleListedSpace,
  monthly: (state) => {
    if (state.subPlan) {
      return state.subPlan.some((el) => el.plan === 'monthly')
    }
  },
  quarterly: (state) => {
    if (state.subPlan) {
      return state.subPlan.some((el) => el.plan === 'quarterly')
    }
  },
  biannually: (state) => {
    if (state.subPlan) {
      return state.subPlan.some((el) => el.plan === 'biannual')
    }
  },
  yearly: (state) => {
    if (state.subPlan) {
      return state.subPlan.some((el) => el.plan === 'yearly')
    }
  },
  houseRules: (state) => {
    return state.propertySetUp?.rules
  },
  subArray: (state) => {
    if (state.subPlan) {
      return state.subPlan.map((el) => el.plan)
    }
  },
  getSingleSpace: (state) => (id) => {
    if (state.listedSpace) {
      return state.listedSpace?.userListings?.find((space) => space.id === id)
    }
  },
}

export const actions = {
  async getListedSpace({ commit }, page) {
    const response = await this.$axios.get(
      `property/listing/get-user-listing?page=${page}`
    )
    if (response.data.statusCode === 200) {
      const listingData = response.data
      commit('ALL_LISTED_SPACE', listingData)
    }
    return response
  },
  async getSingleListedSpace({ commit }, id) {
    const res = await this.$axios.get(`property/listing/${id}`)
    commit('SINGLE_LISTED_SPACE', res.data)
    return res
  },
  async getPropertySetUp({ commit }) {
    const response = await this.$axios.get('property/listing/setup')
    if (response.data.statusCode === 200) {
      const propertySetUp = response.data.data
      commit('UPDATE_PROPERTY_SETUP', propertySetUp)
    }
    return response
  },
  async addBasicInformation(_, payload) {
    const response = await this.$axios.post(
      'property/listing/step/1/level/1',
      payload
    )

    return response
  },
  async updateBasicInformation(_, payload) {
    const response = await this.$axios.patch(
      'property/listing/step/1/level/1',
      payload
    )

    return response
  },
  async getListingDetail({ state, commit }) {
    commit('TOGGLE_LOADING', true)
    const response = await this.$axios.get(
      `property/listing/${state.propertyListingId}/step/${state.step}/level/${state.currentLevel}`
    )
    commit('TOGGLE_LOADING', false)
    return response
  },
  async addRoom(_, payload) {
    const response = await this.$axios.post(
      'property/listing/step/1/level/2',
      payload
    )
    return response
  },
  async deleteBedroom(_, roomId) {
    const response = await this.$axios.delete(
      `property/listing/delete-room/${roomId}`
    )
    return response
  },
  async addFurnishing(_, payload) {
    const response = await this.$axios.post(
      'property/listing/step/1/level/3',
      payload
    )
    return response
  },
  async updateFurnishing(_, payload) {
    const response = await this.$axios.patch(
      'property/listing/step/1/level/3',
      payload
    )
    return response
  },
  async deleteSpaceLayouts({ state }, payload) {
    const response = await this.$axios.delete(
      `property/listing/step/${state.step}/level/${state.currentLevel}`,
      { data: payload }
    )
    return response
  },
  async updateBackendMove({ state }) {
    const response = await this.$axios.patch(
      `property/listing/update-level/${state.propertyListingId}`,
      {
        current_level: state.currentLevel,
        current_step: state.step,
      }
    )
    return response
  },
  async getRooms({ commit, state }) {
    try {
      const response = await this.$axios.get(
        `property/listing/${state.propertyListingId}/step/1/level/2`
      )
      if (response.data.statusCode === 200) {
        commit('UPDATE_ROOMS', response.data.data)
      }
      return response
    } catch (error) {
      this.$errorHandler(error)
    }
  },

  async addImages(_, payload) {
    const response = await this.$axios.post(
      'property/listing/step/1/level/4',
      payload
    )
    return response
  },
  async updateImages(_, payload) {
    const response = await this.$axios.patch(
      'property/listing/step/1/level/4',
      payload
    )
    return response
  },

  async addLocation(_, payload) {
    const response = await this.$axios.post(
      'property/listing/step/1/level/5',
      payload
    )
    return response
  },
  async updateLocation(_, payload) {
    const response = await this.$axios.patch(
      'property/listing/step/1/level/5',
      payload
    )
    return response
  },
  async addSubscription(_, payload) {
    const response = await this.$axios.post(
      'property/listing/step/2/level/1',
      payload
    )
    return response
  },
  async updateSubscription(_, payload) {
    const response = await this.$axios.patch(
      'property/listing/step/2/level/1',
      payload
    )
    return response
  },
  async deleteSubPlan({ state }, payload) {
    const response = await this.$axios.delete(
      `property/listing/sub-plans/${state.propertyListingId}`,
      { data: payload }
    )
    return response
  },
  async addPrice(_, payload) {
    const response = await this.$axios.post(
      'property/listing/step/2/level/2',
      payload
    )
    return response
  },
  async updatePrice(_, payload) {
    const response = await this.$axios.patch(
      'property/listing/step/2/level/2',
      payload
    )
    return response
  },
  async addDiscount(_, payload) {
    const response = await this.$axios.post(
      'property/listing/step/2/level/3',
      payload
    )
    return response
  },
  async updateDiscount(_, payload) {
    const response = await this.$axios.patch(
      'property/listing/step/2/level/3',
      payload
    )
    return response
  },
  async addServiceCharge(_, payload) {
    const response = await this.$axios.post(
      'property/listing/step/2/level/4',
      payload
    )
    return response
  },
  async updateServiceCharge(_, payload) {
    const response = await this.$axios.patch(
      'property/listing/step/2/level/4',
      payload
    )
    return response
  },
  async addHouseRules(_, payload) {
    const response = await this.$axios.post(
      'property/listing/step/2/level/5',
      payload
    )
    return response
  },
  async deleteHouseRules({ state }, payload) {
    const response = await this.$axios.delete(
      `property/listing/rules/${state.propertyListingId}`,
      { data: payload }
    )
    return response
  },
  async getPriceSummary({ state }) {
    const response = await this.$axios.get(
      `property/listing/price-summary/${state.propertyListingId}`
    )
    return response
  },
  async publishListing({ state }) {
    const response = await this.$axios.patch(
      `property/listing/publish/${state.propertyListingId}`
    )
    return response
  },
  async unpublishListing({ state }) {
    const response = await this.$axios.patch(
      `property/listing/unpublish/${state.propertyListingId}`
    )
    return response
  },
  async deleteViewingDay(_, viewingId) {
    const response = await this.$axios.delete(
      `property/listing/viewing/${viewingId}`
    )
    return response
  },
  async updateMove({ state }) {
    const response = await this.$axios.patch(
      `property/listing/update-level/${state.propertyListingId}`,
      {
        current_level: state.currentLevel,
        current_step: state.step,
      }
    )
    return response
  },
}

export const mutations = {
  UPDATE_PROPERTY_SETUP(state, message) {
    state.propertySetUp = message
  },
  UPDATE_LEVEL(state, message) {
    state.currentLevel = message
  },
  UPDATE_STEP(state, message) {
    state.step = message
  },
  UPDATE_ROOMS(state, message) {
    state.rooms = message
  },
  UPDATE_PROPERTY_ID: (state, data) => {
    state.propertyListingId = data
  },
  TOGGLE_LOADING: (state, data) => {
    state.loader = data
  },
  ALL_LISTED_SPACE: (state, data) => {
    state.listedSpace = data.data
  },
  SET_ROOMS(state, data) {
    state.rooms = data
  },
  SET_SUB_PLAN(state, data) {
    state.subPlan = data
  },
  UPDATE_LIST_TYPE(state, data) {
    state.listingType = data
  },
  CURRENT_POSITION(state, id) {
    if (state.listedSpace.userListings?.length > 0) {
      const data = state.listedSpace?.userListings?.find((el) => el.id === id)
      state.listingType = data?.listing_type
      state.subPlan = data?.subscription_option?.subscription_plan
      state.step = state.step === null ? data?.current_step : state.step
      state.currentLevel =
        state.currentLevel === null ? data?.current_level : state.currentLevel
      state.propertyListingId = data?.id
    }
  },
  SINGLE_LISTED_SPACE: (state, data) => {
    state.singleListedSpace = data.data
  },
  SET_LOADER: (state, data) => {
    state.loader = data
  },
  SET_IF_DISCOUNT: (state, data) => {
    state.addDiscount = data
  },
}
