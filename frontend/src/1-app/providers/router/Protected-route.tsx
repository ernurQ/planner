import { routes } from '@Shared/config'
import { FC, PropsWithChildren } from 'react'
import { Navigate } from 'react-router-dom'

export const ProtectedRoute: FC<PropsWithChildren> = ({ children }) => {
  const token = localStorage.getItem('token')
  if (!token) return <Navigate to={routes.login()} />
  return children
}
