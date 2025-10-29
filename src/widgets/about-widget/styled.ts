import { motion } from 'motion/react'
import styled from 'styled-components'

export const Wrapper = styled(motion.div)`
	max-width: 1200px;
	margin: 0 auto;
	padding: 10rem 20px;
	color: #fff;
	font-family: 'Geologica';
`

export const Header = styled.div`
	font-family: 'Geologica';
	text-align: center;
	margin-bottom: 80px;
	h1 {
		font-size: clamp(2rem, 4vw, 3rem);

		color: white;
		margin-bottom: 10px;

		span {
			font-family: 'Zen_Dots';
			background: linear-gradient(90deg, #ff4fb6, #00e0ff);
			-webkit-background-clip: text;
			-webkit-text-fill-color: transparent;
		}
	}
	p {
		color: rgba(255, 255, 255, 0.7);
		max-width: 600px;
		margin: 0 auto;
		font-size: 1.1rem;
	}
`

export const Section = styled.section<{ reverse?: boolean }>`
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 40px;
	flex-direction: ${p => (p.reverse ? 'row-reverse' : 'row')};
	margin-bottom: 100px;

	@media (max-width: 900px) {
		flex-direction: column;
	}
`

export const ImageBlock = styled.div`
	flex: 1;
	img {
		width: 100%;
		border-radius: 20px;
		object-fit: cover;
		box-shadow: 0 0 40px rgba(255, 79, 182, 0.2);
	}
`

export const ContentBlock = styled.div`
	flex: 1;
	h2 {
		font-size: 1.8rem;
		margin-bottom: 12px;
		background: linear-gradient(90deg, #ff4fb6, #00e0ff);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
	}
	p {
		color: rgba(255, 255, 255, 0.8);
		line-height: 1.6;
		margin-bottom: 14px;
	}
`

export const Mission = styled.section`
	text-align: center;
	margin-bottom: 100px;
	h2 {
		font-size: 1.8rem;
		background: linear-gradient(90deg, #ff4fb6, #00e0ff);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		margin-bottom: 1rem;
	}
	p {
		max-width: 700px;
		margin: 0 auto;
		color: rgba(255, 255, 255, 0.75);
		line-height: 1.6;
	}
`

export const Future = styled.section`
	text-align: center;
	padding: 60px 20px;
	border-radius: 20px;
	background: linear-gradient(
		135deg,
		rgba(255, 79, 182, 0.12),
		rgba(0, 224, 255, 0.1)
	);
	box-shadow: 0 0 40px rgba(255, 79, 182, 0.15);
	h2 {
		font-size: 1.8rem;
		margin-bottom: 1rem;
		background: linear-gradient(90deg, #ff4fb6, #00e0ff);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
	}
	p {
		max-width: 600px;
		margin: 0 auto 1.5rem;
		color: rgba(255, 255, 255, 0.75);
		line-height: 1.6;
	}
	button {
		padding: 0.9rem 1.6rem;
		border-radius: 12px;
		border: none;
		background: linear-gradient(90deg, #ff4fb6, #00e0ff);
		color: #0c0c0c;
		font-weight: 700;
		cursor: pointer;
		box-shadow: 0 0 20px rgba(255, 79, 182, 0.4);
		transition: 0.3s ease;
	}
	button:hover {
		filter: brightness(1.1);
	}
`
