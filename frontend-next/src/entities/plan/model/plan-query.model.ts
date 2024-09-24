import { IPlanWithTasks } from './plan.model'

export interface IGetPlanResponse {
	isOwner: boolean
	plan: IPlanWithTasks
}
