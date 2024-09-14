import { lazy } from 'react'
import { createBrowserRouter } from 'react-router-dom'

const Auth = lazy(() => import('@Pages/auth'))
const Register = lazy(() => import('@Pages/auth/register'))
const Login = lazy(() => import('@Pages/auth/login'))

const router = createBrowserRouter([
  {
    path: '/auth',
    element: <Auth />,
    children: [
      {
        path: 'register',
        element: <Register />,
      },
      {
        path: 'login',
        element: <Login />,
      },
    ],
  },
])

export default router
