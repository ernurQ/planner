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

export interface IPlanWithRelations {
  notes: INote[]
  tasks: ITask[]
}
