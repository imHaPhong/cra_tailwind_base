import { Outlet } from 'react-router-dom'

type RegisterLayoutProps = {
  title?: string
}

const RegisterLayout = ({ title }: RegisterLayoutProps) => {
  return (
    <div>
      <h1>{title}</h1>
      <Outlet />
    </div>
  )
}

export default RegisterLayout
