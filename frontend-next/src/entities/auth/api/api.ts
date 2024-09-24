import { ILogin, ILoginResponse } from '../model/login'
import { IRegister } from '../model/register'

import { plannerApi } from '@/shared/api'
import { tokenName } from '@/shared/config'

const authApi = plannerApi.injectEndpoints({
	endpoints: (builder) => ({
		login: builder.mutation<ILoginResponse, ILogin>({
			query: (body) => ({
				url: '/auth/login',
				method: 'POST',
				body
			}),
			onQueryStarted: async (arg, { queryFulfilled }) => {
				const { data } = await queryFulfilled
				localStorage.setItem(tokenName, data.token)
			}
		}),

		register: builder.mutation<null, IRegister>({
			query: (body) => ({
				url: '/auth/register',
				method: 'POST',
				body
			})
		})
	})
})

export const { useLoginMutation, useRegisterMutation } = authApi
