'use client'

import { useRegisterMutation } from '@/entities/auth'

//TODO: test register

export default function RegisterPage() {
	const username = 'admin'
	const password = '1234'

	const [register, { isLoading }] = useRegisterMutation()

	const onRegister = async () => {
		await register({ username, password })
	}

	return (
		<>
			<button onClick={onRegister}>register</button>
			{isLoading && <div>loading...</div>}
		</>
	)
}
