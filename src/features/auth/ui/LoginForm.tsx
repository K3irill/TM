'use client'
import React from 'react'
import { ILoginScheme, loginScheme } from '../model/authScheme'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import useLogin from '../hooks/useLogin'

export default function LoginForm() {
	const {
		register,
		watch,
		handleSubmit,
		formState: { errors },
	} = useForm<ILoginScheme>({
		resolver: zodResolver(loginScheme),
		defaultValues: { email: '', password: '' },
	})
	const { onSubmit: loginSubmit, isPending } = useLogin(30000)

	return (
		<form
			onSubmit={handleSubmit(loginSubmit)}
			className={`relative max-w-2xl px-8 py-4 rounded-2xl shadow-[0_0_100px_#005c808e] ${
				isPending && 'animate-pulse'
			}`}
		>
			<div className='absolute inset-0 backdrop-blur-2xl z-1 rounded-2xl bg-blue-400/50 '></div>
			<div className='relative z-4'>
				<div className='text-3xl text-center font-bold '>Login</div>
				<div className=' mb-2.5'>
					<label>
						<p className='text-2xl mb-2.5'>Email</p>
						<input
							className={`text-xl mb-2.5 rounded-[5px] px-2.5 py-1.5 bg-[#00000069] border ${
								errors.email && 'border-red-600'
							}`}
							{...register('email')}
							type='text'
							placeholder='your email'
						/>
					</label>
					<label>
						<p className='text-2xl mb-2.5'>Password</p>
						<input
							className={`text-xl mb-2.5 rounded-[5px] px-2.5 py-1.5 bg-[#00000069] border ${
								errors.email && 'border-red-600'
							}`}
							{...register('password')}
							type='password'
							placeholder='your password'
						/>
					</label>
				</div>
				<div className='flex justify-center items-center'></div>
				<button
					className={` flex items-center justify-center bg-blue-500 w-full rounded-[5px] p-1.5 font-bold transition duration-500  ease-in-out hover:opacity-70 ${
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
						'Sign In'
					)}
				</button>
			</div>
		</form>
	)
}
