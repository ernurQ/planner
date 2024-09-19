import { plannerApi } from '@Shared/api'
import { apiEndpoints } from '@Shared/config'

import type { IPlan } from '../model/types'

const planApi = plannerApi.injectEndpoints({
  endpoints: (build) => ({
    getUserPlans: build.query<IPlan[], string>({
      query: (username) => apiEndpoints.getUserPlans(username),
    }),
  }),
})

export const { useGetUserPlansQuery } = planApi
