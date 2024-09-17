import { SubmitHandler, useForm } from 'react-hook-form'

import { registerUser } from '@Features/auth-forms/api'
import { routes } from '@Shared/config'
import { PrimaryButton } from '@Shared/ui/buttons'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { IRegisterForm } from '../model/IRegister-form'
import { PasswordInput } from './Password-input'
import { UsernameInput } from './Username-input'

export const RegisterForm = () => {
  const navigate = useNavigate()

  const [responseError, setResponseError] = useState('')

  const { register, handleSubmit, formState, setValue } =
    useForm<IRegisterForm>()
  const usernameError = formState.errors.username?.message
  const passwordError = formState.errors.password?.message

  const onSubmit: SubmitHandler<IRegisterForm> = async (data) => {
    setResponseError('')
    const response = await registerUser(data)
    if (response.status === 201) {
      navigate(routes.home())
      return
    }
    if (response.status === 409) {
      setResponseError(`User with name "${data.username}" already exists`)
      setValue('username', '')
    }
    // TODO: add error alarm
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <UsernameInput register={register} error={usernameError} />
      <PasswordInput register={register} error={passwordError} />
      <PrimaryButton>Register</PrimaryButton>
      {responseError}
    </form>
  )
}
