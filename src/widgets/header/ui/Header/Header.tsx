'use client'

import React from 'react'
import Container from '@/shared/ui/container/Container'
import Logo from '@/shared/ui/logo/Logo'
import NavMain from '../NavMain/NavMain'
import * as S from './styled'
import { motion } from 'framer-motion'
import {
	FaTelegramPlane,
	FaInstagram,
	FaTiktok,
	FaYoutube,
} from 'react-icons/fa'

export default function Header() {
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
							<a href='https://t.me/' target='_blank' rel='noopener noreferrer'>
								<FaTelegramPlane />
							</a>
							<a
								href='https://instagram.com/'
								target='_blank'
								rel='noopener noreferrer'
							>
								<FaInstagram />
							</a>
							<a
								href='https://tiktok.com/'
								target='_blank'
								rel='noopener noreferrer'
							>
								<FaTiktok />
							</a>
							<a
								href='https://youtube.com/'
								target='_blank'
								rel='noopener noreferrer'
							>
								<FaYoutube />
							</a>
						</S.Socials>
					</S.HeaderContent>
				</Container>
			</S.HeaderInner>
		</S.HeaderWrapper>
	)
}
