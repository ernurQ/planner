import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { loginUser } from '@Features/auth-forms/api'
import { routes } from '@Shared/config'
import { PrimaryButton } from '@Shared/ui/buttons'
import { ILoginForm } from '../model/ILogin-form'
import { PasswordInput } from './Password-input'
import { UsernameInput } from './Username-input'

export const LoginForm = () => {
  const navigate = useNavigate()

  const [responseError, setResponseError] = useState('')

  const { register, handleSubmit, formState, setValue } = useForm<ILoginForm>()
  const usernameError = formState.errors.username?.message
  const passwordError = formState.errors.password?.message

  const onSubmit: SubmitHandler<ILoginForm> = async (data) => {
    setResponseError('')
    const response = await loginUser(data)
    if (response.status === 200) {
      const data = await response.json()
      localStorage.setItem('token', data.token)
      navigate(routes.home())
      return
    }
    if (response.status === 401) {
      setResponseError('Incorrect username or password')
      return
    }
    // TODO: add error text
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <UsernameInput register={register} error={usernameError} />
      <PasswordInput register={register} error={passwordError} />
      <PrimaryButton>Login</PrimaryButton>
      {responseError}
    </form>
  )
}
