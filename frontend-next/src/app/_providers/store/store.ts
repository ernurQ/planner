'use client'

import { configureStore } from '@reduxjs/toolkit'

import { plannerApi } from '@/shared/api'

export const store = configureStore({
	reducer: {
		[plannerApi.reducerPath]: plannerApi.reducer
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(plannerApi.middleware),
	devTools: true
})
