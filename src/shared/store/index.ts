import userReducer from '@/entities/user/model/userSlice'
import { configureStore } from '@reduxjs/toolkit'

export const makeStore = () =>
	configureStore({
		reducer: {
			users: userReducer,
			// auth: authReducer
		},
	})

export type RootState = ReturnType<ReturnType<typeof makeStore>['getState']>
export type AppDispatch = ReturnType<ReturnType<typeof makeStore>['dispatch']>
