import { plannerApi } from '@Shared/api'
import { apiEndpoints } from '@Shared/config'

import { IGetPlanResponse } from '@Entities/plan/model/types'
import type { IGetPlanQuery, IPlan } from '../model'

const planQueryApi = plannerApi.injectEndpoints({
  endpoints: (build) => ({
    getUserPlans: build.query<IPlan[], string>({
      query: (username) => apiEndpoints.getUserPlans(username),
    }),
    // TODO: test getPlan
    getPlan: build.query<IGetPlanResponse, IGetPlanQuery>({
      query: ({ ownerName, planTitle }) =>
        apiEndpoints.getPlan(ownerName, planTitle),
    }),
  }),
})

export const { useGetUserPlansQuery, useGetPlanQuery } = planQueryApi
