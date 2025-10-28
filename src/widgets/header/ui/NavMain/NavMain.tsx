'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import * as S from './styled'

export default function NavMain() {
	const navItems = [
		{ name: 'Главная', href: '/' },
		{ name: 'Наборы', href: '/sets' },
		{ name: 'О бренде', href: '/about' },
		{ name: 'Контакты', href: '/contacts' },
	]

	return (
		<S.NavMain>
			<ul>
				{navItems.map(item => (
					<li key={item.name}>
						<Link href={item.href}>
							<motion.div
								whileHover={{
									scale: 1.05,
									color: '#FF4FB6',
								}}
								whileTap={{ scale: 0.96 }}
								transition={{
									type: 'spring',
									stiffness: 250,
									damping: 14,
								}}
							>
								<motion.span
									style={{
										display: 'inline-block',
										position: 'relative',
									}}
								>
									{item.name}
									<motion.span
										className='underline'
										initial={{ scaleX: 0 }}
										whileHover={{ scaleX: 1 }}
										transition={{
											duration: 0.4,
											ease: 'easeOut',
										}}
									/>
								</motion.span>
							</motion.div>
						</Link>
					</li>
				))}
			</ul>
		</S.NavMain>
	)
}
