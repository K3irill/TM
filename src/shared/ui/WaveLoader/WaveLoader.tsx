// components/WaveLoader.tsx
'use client'
import React from 'react'
import { motion } from 'motion/react'
import styled from 'styled-components'

const WaveLoaderContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	height: 100vh;
	background: #05060a;
	flex-direction: column;
	gap: 2rem;
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

const WaveContentWrapper = styled.div`
	position: relative;
	height: 100px;
`

const WaveWrapper = styled.div`
	display: flex;
	align-items: center;
	gap: 8px;
`

const WaveBar = styled(motion.div)`
	width: 4px;
	height: 30px;
	background: linear-gradient(120deg, #ff4fb6, #00e0ff);
	border-radius: 2px;
`

const LoaderText = styled(motion.div)`
	color: rgba(255, 255, 255, 0.8);
	position: absolute;
	left: -50%;
	transform: translate-x(50%);
	bottom: 1rem;
	font-size: 1rem;
	font-weight: 300;
	letter-spacing: 2px;
`

export default function WaveLoader() {
	return (
		<WaveLoaderContainer>
			<WaveContentWrapper>
				<WaveWrapper>
					{[0, 1, 2, 3, 4].map(i => (
						<WaveBar
							key={i}
							animate={{
								height: [20, 40, 20],
								opacity: [0.5, 1, 0.5],
							}}
							transition={{
								duration: 1.2,
								repeat: Infinity,
								delay: i * 0.1,
								ease: 'easeInOut',
							}}
						/>
					))}
				</WaveWrapper>
				<LoaderText
					animate={{ opacity: [0.6, 1, 0.6] }}
					transition={{ duration: 2, repeat: Infinity }}
				>
					ЗАГРУЗКА...
				</LoaderText>
			</WaveContentWrapper>
		</WaveLoaderContainer>
	)
}
