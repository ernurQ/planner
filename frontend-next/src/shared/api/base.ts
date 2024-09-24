import { fetchBaseQuery } from '@reduxjs/toolkit/query'

const _baseQuery = fetchBaseQuery({
	baseUrl: 'http://localhost:3000/api',
	prepareHeaders: (headers) => {
		const token = localStorage.getItem('token')
		if (token) {
			headers.set('Authorization', `Bearer ${token}`)
		}
		return headers
	}
})

export const baseQuery = async (args, api, extraOptions) => {
	const result = await _baseQuery(args, api, extraOptions)
	if (result.error?.status === 403) {
		localStorage.removeItem('token')
		// 403 code: jwt token expired
		// TODO: add refresh token feature
	}
	return result
}
