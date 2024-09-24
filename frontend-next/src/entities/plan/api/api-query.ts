import { IGetPlanResponse } from '@/entities/plan/model/plan-query.model'
import { IPlan } from '@/entities/plan/model/plan.model'
import { plannerApi } from '@/shared/api'

const planQueryApi = plannerApi.injectEndpoints({
	endpoints: (builder) => ({
		getUserPlans: builder.query<IPlan[], { username: string }>({
			query: ({ username }) => `/plans/${username}`
		}),

		getPlan: builder.query<
			IGetPlanResponse,
			{ ownerName: string; title: string }
		>({
			query: ({ ownerName, title }) => `/plans/${ownerName}/${title}`
		})
	})
})

export const { useGetUserPlansQuery, useGetPlanQuery } = planQueryApi
