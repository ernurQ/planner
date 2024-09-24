'use client'

import {
	useDeletePlanMutation,
	useGetPlanQuery,
	useUpdatePlanMutation
} from '@/entities/plan'

interface Props {
	params: {
		ownerName: string
		title: string
	}
}

export default function PlanSettingsPage({
	params: { ownerName, title }
}: Props) {
	const description = 'hello ernur'
	const isPrivate = false
	const isTemplate = true

	const { data, isLoading } = useGetPlanQuery({ ownerName, title })
	const [updatePlan] = useUpdatePlanMutation()
	const [deletePlan] = useDeletePlanMutation()

	if (isLoading || !data) return <div>loading...</div>
	const { plan, isOwner } = data

	const onUpdatePlan = async () => {
		const res = await updatePlan({ title, description, isPrivate, isTemplate })
		console.log(res)
	}

	const onDelete = async () => {
		const res = await deletePlan({ title })
		console.log(res)
	}

	return (
		<div>
			<div>isOwner: {String(isOwner)}</div>
			<div>
				{plan.ownerName}/{plan.title}
			</div>
			<div>{plan.description}</div>
			<div>{plan.createdAt}</div>
			<div>
				{plan.isPrivate} {plan.isTemplate}
			</div>

			<br />

			<h1>settings</h1>

			<button
				className='block'
				onClick={onUpdatePlan}
			>
				update plan
			</button>

			<button
				className='block'
				onClick={onDelete}
			>
				delete plan
			</button>
		</div>
	)
}
