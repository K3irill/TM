import React, { ReactNode } from 'react'
import { OzonBtnStyled } from './styled'

const OzonBtn = ({
	children,
	text,
	...props
}: {
	children?: ReactNode | string
	text?: string
	props?: unknown
}) => {
	return <OzonBtnStyled {...props}>{children || text}</OzonBtnStyled>
}

export default OzonBtn
