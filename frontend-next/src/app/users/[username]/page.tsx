'use client'

import { useGetUserPlansQuery } from '@/entities/plan'

interface Props {
	params: { username: string }
}

export default function UserProfile({ params: { username } }: Props) {
	const { data, isLoading } = useGetUserPlansQuery({ username })

	if (isLoading) return <div>loading...</div>

	return (
		<>
			{username}

			<ul>
				{data?.map((plan) => (
					<li key={plan.title}>
						<div>
							{plan.ownerName}/{plan.title}
						</div>
						<div>{plan.description}</div>
						<div>{plan.createdAt}</div>
						<div>
							{plan.isPrivate} {plan.isTemplate}
						</div>
					</li>
				))}
			</ul>
		</>
	)
}
