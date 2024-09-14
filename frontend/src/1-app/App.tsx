import { RouterProvider } from 'react-router-dom'

import router from '@App/router'

import './styles/index.scss'

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
