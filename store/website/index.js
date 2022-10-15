export const state = () => ({
  productInView: false,
  testimonyInView: false,
})

export const mutations = {
  PRODUCT_IN_VIEW: (state, data) => {
    state.productInView = data
  },
  TESTIMONY_IN_VIEW: (state, data) => {
    state.testimonyInView = data
  },
}
