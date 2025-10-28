'use client'
import React from 'react'
import { IRegisterScheme, registerScheme } from '../model/authScheme'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import useRegister from '../hooks/useRegister'

export default function RegisterForm() {
	const {
		register,
		watch,
		handleSubmit,
		formState: { errors },
	} = useForm<IRegisterScheme>({
		resolver: zodResolver(registerScheme),
		defaultValues: { email: '', password: '', confirm_password: '' },
	})
	const { onSubmit: registerSubmit, isPending } = useRegister(30000)

	return (
		<form
			onSubmit={handleSubmit(registerSubmit)}
			className={`relative max-w-2xl px-8 py-4 rounded-2xl  shadow-[0_0_100px_#8000808e] ${
				isPending && 'animate-pulse'
			}`}
		>
			<div className='absolute inset-0 backdrop-blur-2xl z-1 rounded-2xl bg-purple-500/40 '></div>
			<div className='relative z-4'>
				<div className='text-3xl text-center font-bold '>Register</div>
				<div className=' mb-2.5'>
					<label>
						<p className='text-2xl mb-2.5'>Email</p>
						<input
							autoComplete='false'
							className={`text-xl mb-2.5 rounded-[5px] px-2.5 py-1.5 bg-[#00000069] border ${
								errors.email &&
								'border-red-600 bg-red-700/10 placeholder:text-red-700'
							}`}
							{...register('email')}
							type='text'
							placeholder={errors.email ? errors.email.message : ' Your email'}
						/>
					</label>
					<label>
						<p className='text-2xl mb-2.5'>Password</p>
						<input
							autoComplete='false'
							className={`text-xl mb-2.5 rounded-[5px] px-2.5 py-1.5 bg-[#00000069] border ${
								errors.email &&
								'border-red-600 bg-red-700/10 placeholder:text-red-700'
							}`}
							{...register('password')}
							type='password'
							placeholder={
								errors.password ? errors.password.message : 'Your password'
							}
						/>
					</label>
					<label>
						<p className='text-2xl mb-2.5'>Confirm Password</p>
						<input
							autoComplete='false'
							className={`text-xl mb-2.5 rounded-[5px] px-2.5 py-1.5 bg-[#00000069] border ${
								errors.confirm_password &&
								'border-red-600 bg-red-700/10 placeholder:text-red-700'
							}`}
							{...register('confirm_password')}
							type='password'
							placeholder={
								errors.confirm_password
									? errors.confirm_password.message
									: 'Confirm your password'
							}
						/>
					</label>
				</div>
				<div className='flex justify-center items-center'></div>
				<button
					className={` flex items-center justify-center bg-purple-600 w-full rounded-[5px] p-1.5 font-bold transition duration-500  ease-in-out hover:opacity-70 ${
						isPending ? 'cursor-not-allowed' : 'cursor-pointer'
					}`}
					type='submit'
				>
					{isPending ? (
						<div className='flex gap-2 items-center'>
							<p className='animate-pulse'>Loading </p>
							<div className='relative w-4 h-4 animate-spin'>
								<span className='absolute border-t-4 border-orange-400 rounded-full block w-4 h-4'></span>
								<span className='absolute border-t-4 border-yellow-300 rounded-full block w-4 h-4 bottom-0 rotate-180 '></span>
							</div>
						</div>
					) : (
						'Sign Up'
					)}
				</button>
			</div>
		</form>
	)
}
