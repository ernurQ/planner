import { INote } from '@Entities/note/model'
import { ITask } from '@Entities/task/model'

export interface IPlan {
  title: string
  ownerName: string
  description: string
  isPrivate: boolean
  isTemplate: boolean
  createdAt: string
}

export interface IPlanWithRelations extends IPlan {
  notes: INote[]
  tasks: ITask[]
}

export interface IGetPlanQuery {
  ownerName: string
  planTitle: string
}

export interface IGetPlanResponse {
  plan: IPlanWithRelations
  isOwner: boolean
}
