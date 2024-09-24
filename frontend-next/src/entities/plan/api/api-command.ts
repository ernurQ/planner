import {
	ICreatePlan,
	IDeletePlan,
	IUpdatePlan
} from '@/entities/plan/model/plan-command.model'
import { IPlan } from '@/entities/plan/model/plan.model'
import { plannerApi } from '@/shared/api'

const planCommandApi = plannerApi.injectEndpoints({
	endpoints: (builder) => ({
		createPlan: builder.mutation<IPlan, ICreatePlan>({
			query: (body) => ({
				method: 'POST',
				url: '/plans',
				body
			})
		}),

		deletePlan: builder.mutation<IPlan, IDeletePlan>({
			query: ({ title }) => ({
				method: 'DELETE',
				url: `/plans/${title}`
			})
		}),

		updatePlan: builder.mutation<IPlan, IUpdatePlan>({
			query: ({ title, ...body }) => ({
				method: 'PUT',
				url: `/plans/${title}`,
				body
			})
		})
	})
})

export const {
	useCreatePlanMutation,
	useDeletePlanMutation,
	useUpdatePlanMutation
} = planCommandApi
