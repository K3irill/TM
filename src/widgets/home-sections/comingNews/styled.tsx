import styled, { keyframes } from 'styled-components'
import { motion } from 'framer-motion'

export const Section = styled(motion.section)`
	position: relative;
	min-height: 100dvh;
	padding: 120px 20px;
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	background: radial-gradient(circle at 20% 30%, #ff4fb610 0%, transparent 50%),
		radial-gradient(circle at 80% 70%, #00e0ff10 0%, transparent 50%);
	overflow: hidden;
`

export const Header = styled(motion.h2)`
	font-family: 'Geologica';
	font-size: clamp(2.2rem, 4vw, 3rem);
	text-align: center;
	margin-bottom: 1rem;
	color: #fff;
	letter-spacing: 0.5px;

	span {
		font-family: 'Zen_Dots';
		background: linear-gradient(90deg, #ff4fb6, #00e0ff);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
	}
`

export const Description = styled(motion.p)`
	text-align: center;
	max-width: 600px;
	color: rgba(255, 255, 255, 0.75);
	margin-bottom: 3.5rem;
	font-size: 1.05rem;
	line-height: 1.6;
`

export const Grid = styled.div`
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	gap: 2rem;
	max-width: 1100px;
	width: 100%;
	position: relative;
	z-index: 2;

	@media (max-width: 1024px) {
		grid-template-columns: repeat(2, 1fr);
		gap: 1.5rem;
	}

	@media (max-width: 640px) {
		grid-template-columns: 1fr;
		gap: 1.2rem;
	}
`

const shimmer = keyframes`
  0% { background-position: 0% 50%; }
  100% { background-position: 200% 50%; }
`

export const Card = styled(motion.div)`
	position: relative;
	background: rgba(255, 255, 255, 0.05);
	border-radius: 20px;
	padding: 2rem 1.5rem;
	text-align: center;
	color: #fff;
	border: 1px solid rgba(255, 255, 255, 0.08);
	backdrop-filter: blur(12px);
	transition: all 0.4s ease;
	overflow: hidden;
	box-shadow: 0 0 25px rgba(255, 79, 182, 0.08);

	h3 {
		font-size: 1.2rem;
		margin-top: 1rem;
		margin-bottom: 0.5rem;
		background: linear-gradient(90deg, #ff4fb6, #00e0ff);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
	}

	p {
		color: rgba(255, 255, 255, 0.75);
		font-size: 0.95rem;
		line-height: 1.5;
	}

	&::before {
		content: '';
		position: absolute;
		inset: 0;
		border-radius: 20px;
		background: linear-gradient(120deg, #ff4fb6, #00e0ff, #ff4fb6);
		background-size: 200% 200%;
		animation: ${shimmer} 6s linear infinite;
		opacity: 0.12;
		z-index: -1;
	}
`

export const Icon = styled.div`
	width: 70px;
	height: 70px;
	border-radius: 50%;
	margin: 0 auto;
	display: flex;
	justify-content: center;
	align-items: center;
	background: radial-gradient(circle at 30% 30%, #ff4fb6, #00e0ff);
	color: #0a0a0a;
	font-size: 1.5rem;
	box-shadow: 0 0 25px rgba(255, 79, 182, 0.4);
`

export const SoonLabel = styled.div`
	margin-top: 0.8rem;
	display: inline-block;
	font-size: 0.8rem;
	padding: 0.3rem 0.7rem;
	border-radius: 8px;
	background: rgba(255, 79, 182, 0.15);
	border: 1px solid rgba(255, 79, 182, 0.35);
	color: #ffbce5;
	font-weight: 600;
	letter-spacing: 0.3px;
	animation: blink 2.8s infinite ease-in-out alternate;

	@keyframes blink {
		0%,
		100% {
			opacity: 0.75;
			transform: scale(1);
		}
		50% {
			opacity: 1;
			transform: scale(1.1);
		}
	}
`

export const BackgroundGlow = styled.div`
	position: absolute;
	bottom: -20%;
	left: 50%;
	transform: translateX(-50%);
	width: 100%;
	height: 400px;
	background: radial-gradient(circle at center, #ff4fb620 0%, transparent 70%);
	filter: blur(80px);
	z-index: 1;
`
