export default function ({ $axios, $cookies, redirect, $config }, inject) {
  $axios.setBaseURL(process.env.baseNwURL)
  const user = $cookies.get('user')
  const token = user ? user.token : null
  if (token) {
    $axios.setToken(token, 'Bearer')
  }
  $axios.onResponseError((error) => {
    if (error.response.data.statusCode === 401 && user) {
      $cookies.remove('user')
      window.location = '/login'
    }
  })

  const verifyTenantApi = $axios.create()
  verifyTenantApi.setBaseURL(process.env.baseNwURL)

  inject('verifyTenantApi', verifyTenantApi)
}
