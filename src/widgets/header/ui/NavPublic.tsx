'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'

export default function NavPublic() {
	const pathname = usePathname()

	const links = [
		{ id: 0, text: 'Sign In', href: '/login', visibleOn: ['/register', '/'] },
		{ id: 1, text: 'Sign Up', href: '/register', visibleOn: ['/login', '/'] },
	]

	const visibleLinks = links.filter(link =>
		link.visibleOn.some(path => pathname.startsWith(path))
	)

	return (
		<nav>
			<ul className='flex gap-4'>
				{visibleLinks.length > 0 ? (
					visibleLinks.map(link => (
						<li key={link.id}>
							<Link
								href={link.href}
								className={`text-xl font-bold hover:underline',
									${pathname === link.href && 'text-blue-500'}
								`}
							>
								{link.text}
							</Link>
						</li>
					))
				) : (
					<>
						{links.map(link => (
							<li key={link.id}>
								<Link href={link.href} className='hover:underline'>
									{link.text}
								</Link>
							</li>
						))}
					</>
				)}
			</ul>
		</nav>
	)
}
