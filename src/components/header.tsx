import React from 'react'
import { useAppDispatch, useAppSelecter, useAuthenticated } from 'src/hook/hook'
import { logout } from 'src/pages/Auth/auth.slice'

const Header = () => {
  const authenticated = useAuthenticated()
  const profile = useAppSelecter(value => value.auth.profile)

  const dispatch = useAppDispatch()

  const handleLogout = async () => {
    const res = await dispatch(logout())
  }

  return (
    <div>
      {authenticated && <>
        <ul>
          <li>
            User Id {profile._id}
          </li>
          <li>
            profile
          </li>
          <li onClick={handleLogout}>
            logout
          </li>
        </ul>
      </>}
      {!authenticated && <>
        <ul>
          <li>Login</li>
          <li>Register</li>
        </ul>
      </>}
    </div>
  )
}

export default Header