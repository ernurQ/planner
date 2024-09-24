import { ITask } from '@/entities/task'

export interface IPlan {
	title: string
	ownerName: string

	description: string
	isPrivate: boolean
	isTemplate: boolean

	createdAt: string
}

export interface IPlanWithTasks extends IPlan {
	tasks: ITask[]
}
