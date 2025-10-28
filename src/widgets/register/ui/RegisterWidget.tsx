'use client'
import RegisterForm from '@/features/auth/ui/RegisterForm'
import Container from '@/shared/ui/container/Container'
import React from 'react'

export default function RegisterWidget() {
	return (
		<div className='mt-16'>
			<Container>
				<div className='flex items-center justify-center  h-full '>
					<RegisterForm />
				</div>
			</Container>
		</div>
	)
}
