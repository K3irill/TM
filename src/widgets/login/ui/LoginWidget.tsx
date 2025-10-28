import LoginForm from '@/features/auth/ui/LoginForm'
import Container from '@/shared/ui/container/Container'
import React from 'react'

export default function LoginWidget() {
	return (
		<div className='mt-16'>
			<Container>
				<div className='flex items-center justify-center  h-full '>
					<LoginForm />
				</div>
			</Container>
		</div>
	)
}
