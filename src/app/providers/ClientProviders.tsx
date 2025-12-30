'use client'

import Snowfall from 'react-snowfall'
import StoreProvider from './StoreProvider'
import { QueryProvider } from './QueryProvider'

export default function ClientProviders({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<StoreProvider>
			<QueryProvider>
				<div
					style={{
						position: 'fixed',
						top: 0,
						left: 0,
						width: '100%',
						height: '100%',
						pointerEvents: 'none',
						zIndex: 9999,
					}}
				>
					<Snowfall snowflakeCount={200} />
				</div>
				{children}
			</QueryProvider>
		</StoreProvider>
	)
}
