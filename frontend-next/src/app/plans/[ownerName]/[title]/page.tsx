'use client'

import { useGetPlanQuery } from '@/entities/plan'

interface IProps {
	params: {
		ownerName: string
		title: string
	}
}

export default function PlanPage({ params: { ownerName, title } }: IProps) {
	const { data, isLoading } = useGetPlanQuery({ ownerName, title })

	if (isLoading || !data) return <div>loading...</div>

	const { isOwner, plan } = data

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
			<div>tasks:</div>
			<ul>
				{plan.tasks.map((task) => (
					<li key={task.id}>
						<div>{task.title}</div>
						<div>{task.content}</div>
						<div>{task.date}</div>
						<div>{task.isDone}</div>
					</li>
				))}
			</ul>
		</div>
	)
}
