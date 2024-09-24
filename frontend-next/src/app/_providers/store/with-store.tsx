'use client'

import { ReactNode } from 'react'
import { Provider } from 'react-redux'

import { store } from './store'

export function withStore(Component: () => ReactNode) {
	return function WithStore(props) {
		return (
			<Provider store={store}>
				<Component {...props} />
			</Provider>
		)
	}
}
