export default function ({ $cookies, redirect }) {
  const user = $cookies.get('user')
  if (!user) {
    redirect('/login')
  } else if (user && user.token) {
    if (
      !user.roles.some(
        (role) => role.status === 'active' && role.userType === 'host'
      )
    ) {
      redirect('/login')
    }
  } else {
    redirect('/login')
  }
}
