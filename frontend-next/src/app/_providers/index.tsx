'use client'

import compose from 'compose-function'
import { PropsWithChildren } from 'react'

import { withStore } from './store/with-store'

const withProviders = compose(withStore)

export const Providers = withProviders(
	({ children }: PropsWithChildren) => children
)
