import { useAuth0 } from '@auth0/auth0-react'
import { useEffect, ReactNode } from 'react'
function RequireAuth({ children }: { children: ReactNode }) {
  // the ReactNode type tells typescript that children is something that React allows to render
  // children will be whatever was inside of it and after checking the auth0 stuff we return whatever was inside of us
  const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0()

  const handleLogin = () => {
    loginWithRedirect({
      authorizationParams: {
        redirectUri: window.location.origin,
      },
    })
  }

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      handleLogin()
    }
  }, [isLoading, isAuthenticated, loginWithRedirect])

  if (isLoading) return null

  return children // we are returning the pages
}

export default RequireAuth
