import React, { ReactNode } from 'react'
import { WbButtonStyled } from './styled'

const WbButton = ({
	children,
	text,
	...props
}: {
	children?: ReactNode | string
	text?: string
	props?: unknown
}) => {
	return <WbButtonStyled {...props}>{children || text}</WbButtonStyled>
}

export default WbButton
