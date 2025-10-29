'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import * as S from './styled'

export default function NavMain() {
	const pathname = usePathname()

	const navItems = [
		{ name: 'Главная', href: '/#main' },
		{ name: 'Товары', href: '/goods' },
		{ name: 'О бренде', href: '/about' },
		{ name: 'Контакты', href: null },
	]

	return (
		<S.NavMain>
			<ul>
				{navItems.map(item => {
					const isActive =
						item.href &&
						(pathname === item.href ||
							(pathname.startsWith(item.href) && item.href !== '/#main'))

					return (
						<li key={item.name} data-active={isActive}>
							{item.href ? (
								<Link href={item.href}>
									<NavItem name={item.name} active={!!isActive} />
								</Link>
							) : (
								<button
									type='button'
									onClick={() =>
										typeof window !== 'undefined' &&
										window.scrollTo({
											top: document.body.scrollHeight,
											behavior: 'smooth',
										})
									}
								>
									<NavItem name={item.name} active={false} />
								</button>
							)}
						</li>
					)
				})}
			</ul>
		</S.NavMain>
	)
}

function NavItem({ name, active }: { name: string; active?: boolean }) {
	return (
		<motion.div
			whileHover={{ scale: 1.05, color: '#FF4FB6' }}
			whileTap={{ scale: 0.96 }}
			transition={{ type: 'spring', stiffness: 250, damping: 14 }}
			style={{
				color: active ? '#FF4FB6' : '#fff',
				fontWeight: active ? 700 : 500,
				position: 'relative',
				display: 'inline-block',
			}}
		>
			<span>{name}</span>
			<motion.span
				className='underline'
				style={{
					position: 'absolute',
					bottom: -4,
					left: 0,
					width: '100%',
					height: 2,
					background: active
						? 'linear-gradient(90deg,#FF4FB6,#00E0FF)'
						: 'rgba(255,255,255,0.3)',
					transformOrigin: 'left center',
					scaleX: active ? 1 : 0,
					transition: 'scaleX .3s ease',
				}}
			/>
		</motion.div>
	)
}
