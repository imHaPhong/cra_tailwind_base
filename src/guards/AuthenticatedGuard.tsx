import React from 'react'
import { Navigate, Outlet, Route } from 'react-router-dom'
import { useAuthenticated } from 'src/hook/hook'
import Login from 'src/pages/Auth/login/login'

const AuthenticatedGuard = () => {
  const isAuthenticated = useAuthenticated()
  return isAuthenticated ? <Outlet /> : <Navigate to='/login' />
}

export default AuthenticatedGuard

