import { Navigate, Outlet, useLocation } from 'react-router-dom'

interface Props {
  allowedRoles: string[]
}

const RequireAuth = (props: Props) => {
  const { allowedRoles } = props
  const location = useLocation()
  const role: string = 'customer'

  return allowedRoles?.includes(role) ? (
    <Outlet />
  ) : (
    <Navigate to='/login' state={{ from: location }} replace />
  )
}

export default RequireAuth
