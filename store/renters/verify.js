import jwtDecode from 'jwt-decode'

export const state = () => ({
  currentStep: 1,
  userData: null,
  tenant: null,
  employmentDetails: null,
  nextOfKin: null,
  guarantorDetails: null,
  tenantFirstName: null,
  landlordFullName: null,
  documentUpload: null,
  selfieupload: false,
})

export const actions = {
  async getCountry() {
    const response = await this.$verifyTenantApi.get('/locations/countries')
    return response
  },
  async addPersonalDetails({ dispatch }, payload) {
    const response = await this.$verifyTenantApi.post('/tenants', payload)
    if (response.data.statusCode === 201) {
      dispatch('getUserUpdatedData')
    }
    return response
  },
  async updatePersonalDetails({ dispatch }, { id, ...others }) {
    const response = await this.$verifyTenantApi.patch(`/tenants/${id}`, {
      ...others,
    })
    if (response.data.statusCode === 200) {
      dispatch('getUserUpdatedData')
    }
    return response
  },
  async addEmploymentDetails({ dispatch }, payload) {
    const response = await this.$verifyTenantApi.post(
      '/tenants/employment-details',
      payload
    )
    if (response.data.statusCode === 201) {
      dispatch('getUserUpdatedData')
    }
    return response
  },
  async updateEmploymentDetails({ dispatch }, { id, ...others }) {
    const response = await this.$verifyTenantApi.patch(
      `/tenants/employment-details/${id}`,
      { ...others }
    )
    if (response.data.statusCode === 200) {
      dispatch('getUserUpdatedData')
    }
    return response
  },
  async addNextOfKin({ dispatch }, payload) {
    const response = await this.$verifyTenantApi.post(
      '/tenants/next-of-kin',
      payload
    )
    if (response.data.statusCode === 201) {
      dispatch('getUserUpdatedData')
    }
    return response
  },
  async updateNextOfKin({ dispatch }, { id, ...others }) {
    const response = await this.$verifyTenantApi.patch(
      `/tenants/next-of-kin/${id}`,
      {
        ...others,
      }
    )
    if (response.data.statusCode === 200) {
      dispatch('getUserUpdatedData')
    }
    return response
  },
  async addGuarantor({ dispatch }, payload) {
    const response = await this.$verifyTenantApi.post(
      '/tenants/guarantor',
      payload
    )
    if (response.data.statusCode === 201) {
      dispatch('getUserUpdatedData')
    }
    return response
  },
  async updateGuarantor({ dispatch }, { id, ...others }) {
    const response = await this.$verifyTenantApi.patch(
      `/tenants/guarantor/${id}`,
      {
        ...others,
      }
    )
    if (response.data.statusCode === 200) {
      dispatch('getUserUpdatedData')
    }
    return response
  },
  async getUserToken({ commit }, payload) {
    try {
      const response = await this.$verifyTenantApi.get(
        `/tenants/verification/${payload}`
      )
      if (response.data.statusCode === 200) {
        const token = response.data.data.token

        const tenant = response.data.data.tenant
        const employmentDetails = response.data.data.employmentDetails
        const nextOfKin = response.data.data.nextOfKin
        const guarantorDetails = response.data.data.guarantor
        const step = response.data.data.level
        const tenantFirstName = response.data.data.tenantFirstName
        const landlordFullName = response.data.data.landlordFullName

        if (token) {
          this.$verifyTenantApi.setToken(token, 'Bearer')
          const decoded = jwtDecode(token)
          const userData = {
            landlordId: decoded.landlordId,
            verificationId: decoded.verificationId,
            token,
          }

          commit('SET_USERDATA', userData)
          commit('SET_PERSONAL_DETAILS', tenant)
          commit('SET_EMPLOYMENT_DETAILS', employmentDetails)
          commit('SET_NEXT_OF_KIN', nextOfKin)
          commit('SET_GUARANTOR', guarantorDetails)
          commit('SET_STEP', step)
          commit('SET_TENANTFIRSTNAME', tenantFirstName)
          commit('SET_LANDLORDFULLNAME', landlordFullName)
        }
      }
      return response
    } catch (error) {
      this.$showToast(error.response.data.message, 'error')
    }
  },
  async getUserUpdatedData({ commit }) {
    const userCode = localStorage.getItem('userCode')
    const response = await this.$verifyTenantApi.get(
      `/tenants/verification/${userCode}`
    )
    if (response.data.statusCode === 200) {
      const tenant = response.data.data.tenant
      const employmentDetails = response.data.data.employmentDetails
      const nextOfKin = response.data.data.nextOfKin
      const guarantorDetails = response.data.data.guarantor

      commit('SET_PERSONAL_DETAILS', tenant)
      commit('SET_EMPLOYMENT_DETAILS', employmentDetails)
      commit('SET_NEXT_OF_KIN', nextOfKin)
      commit('SET_GUARANTOR', guarantorDetails)
    }
    return response
  },
  async documentUpload({ state, dispatch }, payload) {
    const response = await this.$verifyTenantApi.patch(
      `/tenants/identification/${state.tenant.id}`,
      payload
    )
    if (response.data.statusCode === 200) {
      dispatch('getUserUpdatedData')
    }
    return response
  },
  async uploadSelfieToBackend({ state, dispatch }, payload) {
    const response = await this.$verifyTenantApi.patch(
      `/tenants/face/${state.tenant.id}`,
      payload
    )
    if (response.data.statusCode === 200) {
      dispatch('getUserUpdatedData')
    }
    return response
  },
  async verificationType() {
    const response = await this.$verifyTenantApi.get(
      '/tenants/verification-channel'
    )
    return response
  },
}

export const mutations = {
  INCREMENT_STEP: (state) => {
    state.currentStep = state.currentStep + 1
  },
  DECREMENT_STEP: (state) => {
    state.currentStep = state.currentStep - 1
  },
  SET_USERDATA: (state, data) => {
    state.userData = data
  },
  SET_PERSONAL_DETAILS: (state, data) => {
    state.tenant = data
  },
  SET_EMPLOYMENT_DETAILS: (state, data) => {
    state.employmentDetails = data
  },
  SET_NEXT_OF_KIN: (state, data) => {
    state.nextOfKin = data
  },
  SET_GUARANTOR: (state, data) => {
    state.guarantorDetails = data
  },
  SET_STEP: (state, data) => {
    state.currentStep = data
  },
  SET_TENANTFIRSTNAME: (state, data) => {
    state.tenantFirstName = data
  },
  SET_LANDLORDFULLNAME: (state, data) => {
    state.landlordFullName = data
  },
  SHOW_SELFIE_UPLOAD: (state) => {
    state.selfieupload = !state.selfieupload
  },
}
