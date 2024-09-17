import { ProtectedRoute } from '@App/providers/router/Protected-route'
import { lazy } from 'react'
import { createBrowserRouter } from 'react-router-dom'

const Auth = lazy(() => import('@Pages/auth'))
const Register = lazy(() => import('@Pages/auth/register'))
const Login = lazy(() => import('@Pages/auth/login'))

const Root = lazy(() => import('@Pages/root'))
const Home = lazy(() => import('@Pages/root/home'))
const User = lazy(() => import('@Pages/root/user'))

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '',
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: ':username',
        element: <User />,
      },
    ],
  },
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
