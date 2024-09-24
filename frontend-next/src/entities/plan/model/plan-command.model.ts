export interface ICreatePlan {
	title: string
	description: string
	isPrivate: boolean
	isTemplate: boolean
}

export interface IDeletePlan {
	title: string
}

export interface IUpdatePlan {
	title: string
	description: string
	isPrivate: boolean
	isTemplate: boolean
}
