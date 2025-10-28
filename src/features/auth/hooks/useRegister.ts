import { useMutation } from '@tanstack/react-query'
import { ILoginScheme, IRegisterScheme } from '../model/authScheme'
import Cookies from 'js-cookie'
import { loginResponse } from '../model/authTypes'
import { useRouter } from 'next/navigation'

function mocRegister(delay: number = 1000): Promise<loginResponse> {
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

const useRegister = (delay?: number) => {
	const router = useRouter()

	const registerMutation = useMutation({
		mutationFn: async (data: IRegisterScheme) => {
			const res = await mocRegister(delay)
			return res
		},
		onSuccess: data => {
			if (data.success) {
				router.push('/login')
			}
		},
		onError: error => {
			console.error(error)
		},
	})

	const onSubmit = (data: IRegisterScheme) => {
		registerMutation.mutate(data)
	}

	return {
		onSubmit,
		isPending: registerMutation.isPending,
		isError: registerMutation.isError,
	}
}

export default useRegister
