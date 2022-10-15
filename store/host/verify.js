export const strict = false

const state = () => ({
  tenantData: [],
  singleTenantData: {},
  verifications: [],
  verificationPlans: [],
  showSnackBar: false,
})
const getters = {
  allTenantData: (state) => state.tenantData,
  singleTenantData: (state) => state.singleTenantData,
  verifications: (state) => state.verifications,
  allverificationPlans: (state) => state.verificationPlans,
}
const actions = {
  async searchTenantData({ commit }, tenantName) {
    const res = await this.$axios.$get(
      `tenants/verification-requests?tenantName=${tenantName}`
    )
    commit('SET_TENANT_DATA', res.data)
    return res
  },
  async fetchTenantsData({ commit }, { status, page }) {
    const url =
      status === 'all'
        ? `tenants/verification-requests?page=${page}`
        : `tenants/verification-requests?status=${status}&page=${page}`
    const res = await this.$axios.$get(url)
    commit('SET_TENANT_DATA', res.data)
    return res
  },
  async fetchSingleTenantData({ commit }, id) {
    const res = await this.$axios.$get(`tenants/verification-request/${id}`)
    commit('GET_SINGLE_TENANT_DATA', res.data)
    return res
  },
  async getLandordRemainingVerfication({ commit }) {
    const res = await this.$axios.$get(`tenants/verifications-remaining`)
    commit('GET_LANDLORD_REMAINING_VERIFICATIONS', res.data)
    return res
  },
  async fetchVerficationPlans({ commit }) {
    const res = await this.$axios.$get(`admin/verifications/plans`)
    // res.map((el) => {
    //   return { ...el, text: el.name }
    // })
    commit('VERIFICATION_PLANS', res.data)
    return res
  },
}
const mutations = {
  SET_TENANT_DATA: (state, data) => {
    state.tenantData = data
  },
  GET_SINGLE_TENANT_DATA: (state, data) => {
    state.singleTenantData = data
  },
  GET_LANDLORD_REMAINING_VERIFICATIONS: (state, data) => {
    state.verifications = data
  },
  TOGGLE_SNACKBAR: (state, data) => {
    state.showSnackBar = data
  },
  VERIFICATION_PLANS: (state, data) => {
    state.verificationPlans = data
  },
}

export default {
  state,
  getters,
  actions,
  mutations,
}
