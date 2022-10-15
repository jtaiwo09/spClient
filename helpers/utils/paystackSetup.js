/* eslint-disable no-undef */
const Paystack = {
  init: () => {
    const payStack = document.createElement('script')
    payStack.setAttribute('src', 'https://js.paystack.co/v1/inline.js')
    document.head.appendChild(payStack)
  },
  startPayment: (res, amount, email, metadata) => {
    const handler = PaystackPop.setup({
      key: window.__NUXT__.config.paystackPublic,
      email,
      amount,
      metadata,
      callback(response) {
        res(response, false)
      },
      onClose() {
        res(null, true)
      },
    })
    handler.openIframe()
  },
}

export default Paystack
