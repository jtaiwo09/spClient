export default ({ $showToast }, inject) => {
  inject('errorHandler', (error) => {
    const errorMessage = error?.response?.data?.message
    if (Array.isArray(errorMessage)) {
      errorMessage.forEach((el) => {
        $showToast(el, 'error')
      })
    } else if (!errorMessage) {
      $showToast('An error occured, please cross-check and try again', 'error')
    } else {
      $showToast(errorMessage, 'error')
    }
  })
}
