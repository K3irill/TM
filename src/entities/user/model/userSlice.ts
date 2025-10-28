import { createSlice } from '@reduxjs/toolkit'
import { user } from './types'

interface userState {
	users: user[]
}

const initialState: userState = {
	users: [],
}

export const userSlice = createSlice({
	name: 'users',
	initialState,
	reducers: {},
})

export const {} = userSlice.actions

export default userSlice.reducer
