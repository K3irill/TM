import styled from 'styled-components'
import { motion } from 'framer-motion'

export const AboutSection = styled(motion.section)`
	position: relative;
	width: 100%;
	padding: 100px 0;
	background: radial-gradient(circle at 30% 20%, #ff4fb622 0%, transparent 60%),
		radial-gradient(circle at 80% 80%, #00e0ff22 0%, transparent 60%);
	overflow: hidden;
	min-height: 100vh 
  height: 100%;

	&::before {
		content: '';
		position: absolute;
		inset: 0;
		background: linear-gradient(to top, rgba(95, 15, 117, 0.211), transparent);
		z-index: 0;
	}
`

export const AboutTitle = styled(motion.h2)`
	font-family: 'Geologica', sans-serif;
	font-size: clamp(2rem, 4vw, 3rem);
	text-align: center;
	margin-bottom: 4rem;
	color: white;
	position: relative;
	z-index: 2;

	span {
		font-family: 'Zen_Dots';
		background: linear-gradient(to right, #ff4fb6, #00e0ff);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
	}
`

export const AboutContent = styled(motion.div)`
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 60px;
	position: relative;
	z-index: 2;

	@media (max-width: 900px) {
		flex-direction: column;
		gap: 40px;
	}
`

export const ImageWrapper = styled(motion.div)`
	flex: 1;
	max-width: 480px;
	max-height: 480px;
	border-radius: 20px;
	overflow: hidden;
	box-shadow: 0 0 25px rgba(148, 8, 255, 0.044),
		0 0 50px rgba(0, 225, 255, 0.105);

	img {
		width: 100%;
		height: 100%;
		min-height: 480px;
		border-radius: 20px;
		object-fit: cover;
	}
`

export const TextWrapper = styled(motion.div)`
	flex: 1;
	color: rgba(255, 255, 255, 0.85);
	display: flex;
	flex-direction: column;
	gap: 1.2rem;
	max-width: 520px;

	h3 {
		font-family: 'Geologica';
		font-size: clamp(1.5rem, 3vw, 2.5rem);
		background: linear-gradient(to right, #ff4fb6, #00e0ff);
		line-height: 1;
		font-weight: 800;
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
	}

	p {
		font-family: 'Inter', sans-serif;
		line-height: 1.7;
		font-size: 1.05rem;
	}

	em {
		font-style: normal;
		color: #ff9fcf;
	}

	@media (max-width: 900px) {
		max-width: 100%;
		text-align: center;
	}
`

export const Highlight = styled.div`
	margin-top: 1rem;
	padding: 1rem 1.5rem;
	background: rgba(255, 255, 255, 0.05);
	border-radius: 12px;
	text-align: center;
	color: #fff;
	font-weight: 500;
	backdrop-filter: blur(10px);
	box-shadow: 0 0 20px rgba(255, 79, 182, 0.1);
	font-family: 'Manrope', sans-serif;
`
