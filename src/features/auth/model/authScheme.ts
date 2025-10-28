import z from 'zod'

export const loginScheme = z.object({
	email: z.string().email('Enter correct email'),
	password: z.string().min(6, 'Min 6 letters'),
})

export type ILoginScheme = z.infer<typeof loginScheme>

export const registerScheme = z
	.object({
		email: z.string().email('Enter correct email'),
		password: z.string().min(6, 'Min 6 letters'),
		confirm_password: z.string().min(6, 'Min 6 letters'),
	})
	.refine(data => data.confirm_password === data.password, {
		message: 'Password do not  match',
		path: ['confirm_password'],
	})

export type IRegisterScheme = z.infer<typeof registerScheme>
