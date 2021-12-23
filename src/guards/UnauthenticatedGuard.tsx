import React from 'react'
import { useAuthenticated } from 'src/hook/hook'
import { Outlet, Navigate } from 'react-router-dom'

const UnauthenticatedGuard = () => {
  const isAuthenticated = useAuthenticated()
  return !isAuthenticated ? <Outlet /> : <Navigate to='/' />
}

export default UnauthenticatedGuard
