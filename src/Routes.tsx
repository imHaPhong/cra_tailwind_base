import { Route, Routes } from 'react-router-dom'
import App from './App'
import { path } from './constants/path'
import AuthenticatedGuard from './guards/AuthenticatedGuard'
import UnauthenticatedGuard from './guards/UnauthenticatedGuard'
import HomeLayout from './layouts/home-layout'
import RegisterLayout from './layouts/Register/RegisterLayout'
import Login from './pages/Auth/login/login'
import Register from './pages/Auth/register/register'
import { Home } from './pages/home/home'
import NotFound from './pages/not-found/not-found'

export default function Routesx() {
  return (
    <Routes>
      <Route path='/' element={<AuthenticatedGuard />}>
        <Route path="/" element={<HomeLayout />}>
          <Route path='' element={<Home />} />
        </Route>
      </Route>
      {/* <Route element={<RegisterLayout title='Login' />}>
        <Route path={path.login} element={<Login />} />
      </Route>
      <Route path={path.register} element={<RegisterLayout title='register' />}>
        <Route path='/' element={<Register />} />
      </Route> */}
      <Route path='/' element={<UnauthenticatedGuard />} >
        <Route path={path.register} element={<RegisterLayout title='register' />}>
          <Route path="" element={<Register />} />
        </Route>
        <Route path={path.login} element={<RegisterLayout title='login' />}>
          <Route path="" element={<Login />} />
        </Route>
      </Route>
      <Route path={path.notFound} element={<NotFound />} />
    </Routes>
  )

}