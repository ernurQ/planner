'use client'

import { useLoginMutation } from '@/entities/auth'

export default function LoginPage() {
	const username = 'admin'
	const password = '1234'

	const [login, { isLoading }] = useLoginMutation()

	const onLogin = async () => {
		await login({ username, password })
	}

	return (
		<div>
			<button onClick={onLogin}>login</button>
			{isLoading && <div>loading...</div>}
		</div>
	)
}
