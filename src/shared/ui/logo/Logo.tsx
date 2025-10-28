import React from 'react'
import { LogoStyled } from './styled'

function Logo() {
	return (
		<LogoStyled className='text-4xl font-extrabold font-(family-name:--font-nabla) cursor-pointer'>
			<img src='/logo-1.svg' alt='' />
		</LogoStyled>
	)
}

export default Logo
