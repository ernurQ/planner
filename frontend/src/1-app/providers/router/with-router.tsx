import { router } from '@App/providers/router/router'
import { RouterProvider } from 'react-router-dom'

export const withRouter = (component: () => React.ReactNode) => () =>
  (
    <>
      {component()}
      <RouterProvider router={router} />
    </>
  )
