import { LoginForm } from '@Features/auth-forms'

const Login = () => {
  return (
    <div className='grid grid-cols-3'>
      Login
      <div className=' col-start-2'>
        <LoginForm />
      </div>
    </div>
  )
}

export default Login
