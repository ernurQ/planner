import { UseFormRegister } from 'react-hook-form'

import clsx from 'clsx'
import { ComponentProps, FC } from 'react'
import { IRegisterForm } from '../model/IRegister-form'

interface PasswordInputProps extends ComponentProps<'input'> {
  register: UseFormRegister<IRegisterForm>
  error?: string
}

export const PasswordInput: FC<PasswordInputProps> = ({
  register,
  error,
  className,
}) => {
  return (
    <div className={clsx('sm:col-span-3', className)}>
      <label
        htmlFor='password'
        className='block text-sm font-medium leading-6 text-gray-900'
      >
        Password
      </label>

      <input
        {...register('password', { required: 'This field is required' })}
        type='password'
        name='password'
        id='password'
        autoComplete='password'
        className='mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
      />
      {error && <p className='text-red-600'>{error}</p>}
    </div>
  )
}
