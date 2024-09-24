import { createApi } from '@reduxjs/toolkit/query/react'

import { baseQuery } from './base'

export const plannerApi = createApi({
	reducerPath: 'plannerApi',
	baseQuery: baseQuery,
	endpoints: () => ({})
})
