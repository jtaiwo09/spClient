export default ({ $toast }, inject) => {
  inject('showToast', (message, type) => {
    $toast[type](message, {
      position: 'top-right',
      timeout: 5000,
    })
  })
}
