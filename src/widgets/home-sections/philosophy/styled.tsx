import styled, { keyframes } from 'styled-components'
import { motion } from 'framer-motion'

export const Section = styled(motion.section)`
	position: relative;
	min-height: 100dvh;

	padding: 120px 20px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	background: radial-gradient(circle at 20% 30%, #ff4fb61a 0%, transparent 50%),
		radial-gradient(circle at 80% 70%, #00e0ff1a 0%, transparent 55%);
	overflow: hidden;
	width: 100%;
`

export const Header = styled(motion.h2)`
	font-family: 'Geologica';
	font-size: clamp(2.2rem, 4vw, 3rem);
	text-align: center;
	margin-bottom: 4rem;
	color: #fff;
	letter-spacing: 0.5px;

	span {
		font-family: 'Zen_Dots';
		background: linear-gradient(90deg, #ff4fb6, #00e0ff);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
	}
`

export const Grid = styled.div`
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	gap: 2rem;
	max-width: 1200px;
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

const pulse = keyframes`
  0%,100% { opacity: 0.7; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.05); }
`

export const Card = styled(motion.div)`
	background: rgba(255, 255, 255, 0.06);
	border-radius: 20px;
	padding: 2rem 1.5rem;
	color: #fff;
	position: relative;
	text-align: center;
	border: 1px solid rgba(255, 255, 255, 0.08);
	backdrop-filter: blur(10px);
	transition: all 0.4s ease;
	box-shadow: 0 0 25px rgba(255, 79, 182, 0.1);

	h3 {
		font-size: 1.2rem;
		font-weight: 700;
		margin: 0.8rem 0 0.6rem;
		background: linear-gradient(90deg, #ff4fb6, #00e0ff);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
	}

	p {
		color: rgba(255, 255, 255, 0.75);
		font-size: 0.95rem;
		line-height: 1.6;
	}

	&:hover::before {
		opacity: 0.8;
	}
`

export const IconWrap = styled.div`
	width: 70px;
	height: 70px;
	margin: 0 auto 1rem;
	border-radius: 50%;
	display: flex;
	justify-content: center;
	align-items: center;
	background: radial-gradient(circle at 30% 30%, #ff4fb6, #00e0ff);
	color: #0a0a0a;
	font-size: 1.5rem;
	box-shadow: 0 0 25px rgba(255, 79, 182, 0.4);
`

export const FadeGlow = styled.div`
	position: absolute;
	bottom: -40%;
	left: 50%;
	transform: translateX(-50%);
	width: 100%;
	height: 400px;
	background: radial-gradient(circle at center, #ff4fb620 0%, transparent 70%);
	filter: blur(80px);
	z-index: 1;
`
