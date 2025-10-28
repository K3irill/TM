'use client'

import React from 'react'
import { makeStore } from '@/shared/store'
import { Provider } from 'react-redux'

const StoreProvider = ({ children }: { children: React.ReactNode }) => {
	const store = makeStore()

	return <Provider store={store}>{children}</Provider>
}

export default StoreProvider
