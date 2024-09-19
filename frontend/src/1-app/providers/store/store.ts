import { configureStore } from '@reduxjs/toolkit'
import { plannerApi } from '@Shared/api'

export const store = configureStore({
  reducer: {
    [plannerApi.reducerPath]: plannerApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(plannerApi.middleware),
  devTools: true,
})
