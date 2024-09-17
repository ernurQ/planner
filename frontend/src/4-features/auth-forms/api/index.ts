import { ILoginForm } from '@Features/auth-forms/model/ILogin-form'
import { IRegisterForm } from '@Features/auth-forms/model/IRegister-form'
import { apiBaseUrl } from '@Shared/config'

const fetchOptions = {
  method: 'POST',
  headers: {
    'content-type': 'application/json',
  },
}

export const registerUser = async ({ username, password }: IRegisterForm) =>
  fetch(`${apiBaseUrl}/auth/register`, {
    ...fetchOptions,
    body: JSON.stringify({ name: username, password }),
  })

export const loginUser = async (body: ILoginForm) => {
  return fetch(`${apiBaseUrl}/auth/login`, {
    ...fetchOptions,
    body: JSON.stringify(body),
  })
}
