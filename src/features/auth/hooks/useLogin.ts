import { useMutation } from '@tanstack/react-query'
import { ILoginScheme } from '../model/authScheme'
import Cookies from 'js-cookie'
import { loginResponse } from '../model/authTypes'
import { useRouter } from 'next/navigation'

function mocLogin(delay: number = 1000): Promise<loginResponse> {
	return new Promise(resolve => {
		setTimeout(() => {
			resolve({
				success: true,
				token: 'fsafar1241rbasjbkfqi4u1',
				user: {
					name: 'penis',
				},
			})
		}, delay)
	})
}

const useLogin = (delay?: number) => {
	const router = useRouter()

	const loginMutation = useMutation({
		mutationFn: async (data: ILoginScheme) => {
			const res = await mocLogin(delay)
			return res
		},
		onSuccess: data => {
			if (data.token) {
				Cookies.set('token', data.token)
				router.push('/')
			}
		},
		onError: error => {
			console.error(error)
		},
	})

	const onSubmit = (data: ILoginScheme) => {
		loginMutation.mutate(data)
	}

	return {
		onSubmit,
		isPending: loginMutation.isPending,
		isError: loginMutation.isError,
	}
}

export default useLogin
