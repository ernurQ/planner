import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'

// TODO: add loading component
const Root = () => {
  return (
    <>
      Root
      <Suspense fallback={<div>loading...</div>}>
        <Outlet />
      </Suspense>
    </>
  )
}

export default Root
