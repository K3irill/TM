import React from 'react'
import { LogoStyled } from './styled'
import Link from 'next/link'

function Logo() {
	return (
		<LogoStyled className='text-4xl font-extrabold font-(family-name:--font-nabla) cursor-pointer'>
			<Link href='/'>
				{/* <img src='/logo/logo-1.svg' alt='' /> */}
				<img src='/logo/logo-new-year.svg' alt='' />
			</Link>
		</LogoStyled>
	)
}

export default Logo
