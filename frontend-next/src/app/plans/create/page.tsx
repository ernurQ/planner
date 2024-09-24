'use client'

import { useCreatePlanMutation } from '@/entities/plan'

export default function CreatePlanPage() {
	const title = 'plan2'
	const description = 'hello world'
	const isPrivate = true
	const isTemplate = false

	const [createPlan, { isLoading, isSuccess }] = useCreatePlanMutation()

	const onCreatePlan = async () => {
		const { data } = await createPlan({
			title,
			description,
			isPrivate,
			isTemplate
		})

		if (isSuccess && data) {
			// TODO: add toast to notify successful creation
		}
		console.log(data)
	}

	return (
		<>
			<div>create plan</div>
			<button onClick={onCreatePlan}>create</button>
			{isLoading && <div>loading...</div>}
		</>
	)
}
