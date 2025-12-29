'use client'

import React from 'react'
import Container from '@/shared/ui/container/Container'
import Logo from '@/shared/ui/logo/Logo'
import NavMain from './ui/NavMain/NavMain'
import * as S from './styled'
import { motion } from 'framer-motion'
import {
	FaTelegramPlane,
	FaInstagram,
	FaTiktok,
	FaYoutube,
} from 'react-icons/fa'
import { IHeaderModes } from './model/types'

export default function Header({ mode }: { mode: IHeaderModes }) {
	return (
		<S.HeaderWrapper>
			<S.HeaderBlur />
			<S.HeaderInner>
				<Container>
					<S.HeaderContent>
						<motion.div
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.97 }}
							transition={{ type: 'spring', stiffness: 250, damping: 18 }}
						>
							<Logo />
						</motion.div>

						<S.NavCenter>
							<NavMain />
						</S.NavCenter>

						<S.Socials>
							<motion.a
								href='https://t.me/tarimi_official'
								target='_blank'
								rel='noreferrer'
								aria-label='Telegram'
								animate={{
									scale: [1, 1.03, 1],
								}}
								transition={{
									duration: 4,
									repeat: Infinity,
									ease: 'easeInOut',
								}}
							>
								Телеграм блог: <FaTelegramPlane />
							</motion.a>
							{/* <a
								href='https://www.instagram.com/tarimi.official/'
								target='_blank'
								rel='noopener noreferrer'
							>
								<FaInstagram />
							</a>
							<a
								href='https://www.tiktok.com/@tarimi.official'
								target='_blank'
								rel='noopener noreferrer'
							>
								<FaTiktok />
							</a>
							<a
								href='https://youtube.com/@tarimi.official?si=GHULU2lx7nP73v5z'
								target='_blank'
								rel='noopener noreferrer'
							>
								<FaYoutube />
							</a> */}
						</S.Socials>
					</S.HeaderContent>
				</Container>
			</S.HeaderInner>
		</S.HeaderWrapper>
	)
}
