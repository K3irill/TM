// components/RamenLoader.tsx
'use client'
import React from 'react'
import { motion } from 'motion/react'
import styled from 'styled-components'

const LoaderContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	height: 100vh;
	background: #05060a;
	flex-direction: column;
	gap: 2rem;
`

const Bowl = styled(motion.div)`
	width: 80px;
	height: 40px;
	border: 2px solid #ff2079;
	border-radius: 0 0 40px 40px;
	position: relative;

	&::before {
		content: '';
		position: absolute;
		top: -5px;
		left: -2px;
		right: -2px;
		height: 4px;
		background: #ff2079;
		border-radius: 50%;
	}
`

const Noodle = styled(motion.div)`
	position: absolute;
	top: 10px;
	left: 10px;
	right: 10px;
	height: 2px;
	background: #cdb67f;
	border-radius: 1px;
`

const Steam = styled(motion.div)`
	position: absolute;
	top: -20px;
	width: 8px;
	height: 15px;
	background: rgba(222, 122, 231, 0.3);
	border-radius: 4px;
`

const Text = styled(motion.div)`
	color: rgba(255, 255, 255, 0.8);
	font-size: 1rem;
	font-weight: 300;
	letter-spacing: 2px;
`

export default function RamenLoader() {
	return (
		<LoaderContainer>
			<Bowl
				animate={{ scale: [1, 1.05, 1] }}
				transition={{ duration: 2, repeat: Infinity }}
			>
				<Noodle
					animate={{ rotate: [0, 5, -5, 0] }}
					transition={{ duration: 3, repeat: Infinity }}
				/>
				<Noodle
					animate={{ rotate: [0, 5, -5, 0] }}
					transition={{ duration: 3, repeat: Infinity }}
				/>
				{[0, 1, 2].map(i => (
					<Steam
						key={i}
						style={{ left: 20 + i * 20 }}
						animate={{
							y: [0, -10, -20],
							opacity: [0, 1, 0],
							scale: [1, 1.2, 1],
						}}
						transition={{
							duration: 2,
							repeat: Infinity,
							delay: i * 0.3,
						}}
					/>
				))}
			</Bowl>
			<Text
				animate={{ opacity: [0.6, 1, 0.6] }}
				transition={{ duration: 2, repeat: Infinity }}
			>
				ГОТОВИМ...
			</Text>
		</LoaderContainer>
	)
}
