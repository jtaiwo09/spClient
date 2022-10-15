export const strict = false

export const state = () => ({
  faqs: [],
  active: 'general',
  loader: false,
})

export const mutations = {
  SET_FAQS: (state, data) => {
    state.faqs = data
  },

  SET_ACTIVE_FAQS: (state, data) => {
    state.active = data
  },

  SET_LOADER: (state, data) => {
    state.loader = data
  },
}

export const actions = {
  async getFAQs({ commit }) {
    commit('SET_LOADER', true)
    const response = await this.$axios.$get('faqs')
    commit('SET_LOADER', false)

    if (response.statusCode === 200) {
      commit('SET_FAQS', response.data)
    }
  },
  activeTab({ commit }, status) {
    commit('SET_ACTIVE_FAQS', status)
  },
}

export const getters = {
  activeFAQs: (state) => {
    return state.faqs.filter((faq) => {
      return faq.groupName === state.active
    })
  },
}
