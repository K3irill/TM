'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import styled from 'styled-components'

export default function NotFoundPage() {
	return (
		<Wrap
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.6 }}
		>
			<motion.div
				initial={{ y: 20, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				transition={{ duration: 0.8, ease: 'easeOut' }}
			>
				<h1>404</h1>
				<h2>Страница не найдена</h2>
				<p>
					Похоже, вы свернули не туда… Но не переживайте — вернитесь домой и
					попробуйте снова 🍜
				</p>
			</motion.div>

			<Link href='/'>
				<motion.button
					whileHover={{
						scale: 1.06,
						boxShadow: '0 0 24px rgba(255,79,182,0.4)',
					}}
					whileTap={{ scale: 0.94 }}
				>
					Вернуться на главную
				</motion.button>
			</Link>

			<BGGlow
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 1.5, delay: 0.3 }}
			/>
		</Wrap>
	)
}

const Wrap = styled(motion.main)`
	min-height: 100vh;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	text-align: center;
	color: white;
	position: relative;
	overflow: hidden;
	padding: 2rem;

	h1 {
		font-size: clamp(6rem, 18vw, 12rem);
		font-family: 'Zen_Dots', sans-serif;
		background: linear-gradient(90deg, #ff4fb6, #00e0ff);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		margin-bottom: 0.5rem;
		line-height: 1;
	}

	h2 {
		font-family: 'Geologica', sans-serif;
		font-size: clamp(1.4rem, 3vw, 2rem);
		margin-bottom: 1rem;
		letter-spacing: 0.5px;
	}

	p {
		max-width: 480px;
		color: rgba(255, 255, 255, 0.8);
		line-height: 1.5;
		margin: 0 auto 2rem;
		font-size: 1rem;
	}

	button {
		font-family: 'Manrope';
		font-weight: 700;
		font-size: 1rem;
		background: linear-gradient(90deg, #ff4fb6, #00e0ff);
		color: #0c0c0c;
		border: none;
		padding: 0.9rem 1.8rem;
		border-radius: 14px;
		cursor: pointer;
		transition: 0.3s ease;
	}
`

const BGGlow = styled(motion.div)`
	position: absolute;
	inset: 0;
	background: radial-gradient(
			circle at 30% 20%,
			rgba(255, 79, 182, 0.2),
			transparent 60%
		),
		radial-gradient(circle at 80% 80%, rgba(0, 224, 255, 0.2), transparent 70%);
	filter: blur(80px);
	z-index: -1;
`
