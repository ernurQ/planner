import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'

// TODO: add loading component
const Auth = () => {
  return (
    <>
      Auth
      <Suspense fallback={<div>loading...</div>}>
        <Outlet />
      </Suspense>
    </>
  )
}

export default Auth
