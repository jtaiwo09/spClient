export default function ({ $cookies, redirect }) {
  const user = $cookies.get('user')
  if (user && user.token) {
    if (
      user.roles?.some(
        (role) => role.status === 'active' && role.userType === 'host'
      )
    ) {
      redirect('/host')
    } else if (
      user.roles?.some(
        (role) => role.status === 'active' && role.userType === 'member'
      )
    ) {
      redirect('/renter')
    }
  }
}
