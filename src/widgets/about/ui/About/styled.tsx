import styled from 'styled-components'
import { motion } from 'framer-motion'

export const AboutWrapper = styled(motion.section)`
	position: relative;
	padding: 120px 0;
	background: radial-gradient(circle at 20% 30%, #ff4fb620 0%, transparent 50%),
		radial-gradient(circle at 80% 70%, #00e0ff20 0%, transparent 60%);
	overflow: visible;
`

export const Header = styled(motion.h2)`
	text-align: center;
	font-family: 'Geologica';
	font-size: clamp(2.2rem, 4vw, 3.2rem);
	color: white;
	margin-bottom: 4rem;

	span {
		font-family: 'Zen_Dots';
		background: linear-gradient(to right, #ff4fb6, #00e0ff);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
	}
`

export const AboutBody = styled(motion.div)`
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 60px;
	perspective: 1000px;

	@media (max-width: 960px) {
		flex-direction: column;
		gap: 40px;
	}
`

export const SliderWrapper = styled.div`
	width: 100%;
	max-width: 650px;
	margin: 0 auto;
	overflow: visible;
	position: relative;

	.swiper {
		width: 100%;
		padding: 40px 0;
	}

	.swiper-slide {
		width: 300px !important;
		height: 400px !important;
		display: flex;
		justify-content: center;
		align-items: center;
		overflow: hidden;
		border-radius: 20px;
	}

	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		border-radius: 20px;
		box-shadow: 0 0 40px rgba(255, 79, 182, 0.25);
		transition: transform 0.6s ease, box-shadow 0.6s ease;

		&:hover {
			transform: scale(1.05);
			box-shadow: 0 0 60px rgba(255, 79, 182, 0.4),
				0 0 80px rgba(0, 224, 255, 0.3);
		}
	}

	@media (max-width: 768px) {
		max-width: 100%;
		.swiper-slide {
			width: 230px !important;
			height: 300px !important;
		}
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
