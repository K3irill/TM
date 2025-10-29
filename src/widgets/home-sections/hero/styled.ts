import styled, { keyframes } from 'styled-components'
import { motion } from 'framer-motion'
const glow = keyframes`
  0% {
    filter: drop-shadow(0 0 20px rgba(255, 79, 182, 0.4))
            drop-shadow(0 0 40px rgba(255, 240, 79, 0.6));
    opacity: 0.95;
  }
  50% {
    filter: drop-shadow(0 0 30px rgba(255, 229, 79, 0.7))
            drop-shadow(0 0 60px rgba(255, 79, 182, 0.9));
    opacity: 1;
  }
  100% {
    filter: drop-shadow(0 0 20px rgba(255, 79, 182, 0.4))
            drop-shadow(0 0 40px rgba(255, 211, 79, 0.6));
    opacity: 0.95;
  }
`

export const Wrapper = styled.div`
	position: relative;
	width: 100%;
	height: 100vh;
	overflow: hidden;
`

export const BackgroundVideo = styled(motion.video)<{
	$blur?: string
	$brightness?: string
}>`
	position: absolute;
	inset: 0;
	width: 100%;
	height: 100%;
	object-fit: cover;
	pointer-events: none; /* чтобы клики проходили сквозь */
	filter: ${({ $blur }) => ($blur ? `blur(${$blur})` : 'none')}
		${({ $brightness }) => ($brightness ? `brightness(${$brightness})` : '')};
	z-index: 0;
	/* небольшой апскейл сгладит края при blur */
	transform: scale(1.02);
	will-change: transform, filter;
`

export const BackgroundLayer = styled.div<{
	$img?: string
	$gradient?: string
	$blur?: string
	$brightness?: string
}>`
	position: absolute;
	inset: 0;
	z-index: 0;
	background: ${({ $gradient }) => $gradient ?? 'none'},
		${({ $img }) => $img ?? 'none'};
	background-size: cover, cover;
	background-position: center;
	filter: ${({ $blur }) => ($blur ? `blur(${$blur})` : 'none')}
		${({ $brightness }) => ($brightness ? `brightness(${$brightness})` : '')};
	will-change: transform;
`

export const Inner = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	min-height: 100vh;
`

export const Background = styled.div`
	position: absolute;
	inset: 0;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	filter: blur(7px) brightness(0.4);
	background: radial-gradient(circle at center, #f302ab3b, #8709ee41),
		url('./wallpaper.jpg');
	z-index: 0;

	&:before {
		content: '';
		width: 100%;
		height: 100%;
		position: absolute;
		background: radial-gradient(
			circle,
			rgba(13, 177, 199, 0.475) 0%,
			rgba(87, 199, 134, 0) 49%,
			rgba(22, 20, 22, 0.131) 100%
		);
	}
`

export const Content = styled.div`
	position: relative;
	z-index: 10;
	max-width: 1024px;
	margin: 0 auto;
	padding: 4rem 1.5rem 0;
	text-align: center;
`

export const Icon = styled.div<{ $isLampOn?: boolean }>`
	font-size: clamp(4rem, 10vw, 7rem);
	cursor: pointer;
	display: flex;
	align-items: center;
	justify-content: center;
	position: relative;
	animation: ${glow} 5s ease-in-out infinite;
	z-index: 0;
	-webkit-tap-highlight-color: transparent;
	-webkit-touch-callout: none;
	-webkit-user-select: none;

	span {
		-webkit-tap-highlight-color: transparent;
	}

	svg {
		width: 250px;
		margin-bottom: -150px;
	}

	${p =>
		p.$isLampOn
			? `	animation: none;
	text-shadow: 0 0 30px rgba(255, 155, 79, 0.8),
		0 0 60px rgba(255, 79, 182, 0.6); filter: drop-shadow(0 0 30px rgba(255, 79, 182, 0.5));`
			: `	filter: brightness(0.7);`}
`

export const Title = styled.h1`
	color: white;
	margin-bottom: 1rem;
	letter-spacing: -0.02em;
	position: relative;
	z-index: 1;
	filter: drop-shadow(0px 0px 2px black);

	span:first-child {
		font-family: 'Zen_Dots';
		font-weight: 400;
		font-size: clamp(2.5rem, 4vw, 3rem);
		background: linear-gradient(to right, #e69cc7, #f1fbfa, #61d9e9);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
	}

	span:nth-child(2) {
		display: block;
		font-family: 'Zen_Dots';
		font-weight: 400;
		font-size: clamp(4.5rem, 8vw, 8rem);
		line-height: 1;
		background: linear-gradient(to right, #ff4fb6, white, #00e0ff);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		margin-bottom: 1rem;
	}

	span:last-child {
		font-family: 'Inter';
		display: block;
		font-size: clamp(1.5rem, 3vw, 2rem);
		color: rgba(255, 255, 255, 0.9);
	}
`

export const Description = styled.p`
	color: rgba(246, 230, 217, 0.85);
	font-size: clamp(0.95rem, 2.5vw, 1.125rem);
	line-height: 1.7;
	max-width: 32rem;
	margin: 0 auto 2.5rem;
	font-family: 'Inter', sans-serif;
	text-shadow: 0 0 8px rgba(0, 0, 0, 0.25);

	@media (max-width: 640px) {
		line-height: 1.5;
		margin-bottom: 2rem;
		color: rgba(236, 233, 233, 0.85);
	}
`

export const ButtonGroup = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1rem;
	justify-content: center;
	align-items: center;
	width: 100%;

	@media (min-width: 640px) {
		flex-direction: row;
		gap: 1.5rem;
	}
`

export const Button = styled.button<{ variant?: 'pink' | 'blue' }>`
	all: unset;
	cursor: pointer;
	display: inline-flex;
	align-items: center;
	justify-content: center;
	text-align: center;
	font-family: 'Geologica', sans-serif;
	font-weight: 600;
	letter-spacing: 0.5px;
	border-radius: 0.75rem;
	padding: 1rem 2.25rem;
	min-width: 170px;
	font-size: clamp(0.8rem, 2.2vw, 0.9rem);
	text-transform: uppercase;
	transition: all 0.35s ease;
	position: relative;
	overflow: hidden;
	z-index: 1;
	color: ${({ variant }) => (variant === 'pink' ? '#fff' : '#0C0C0C')};
	background: ${({ variant }) =>
		variant === 'pink'
			? 'linear-gradient(135deg, #FF4FB6 0%, #FF94C8 100%)'
			: 'linear-gradient(135deg, #00E0FF 0%, #A2FFF9 100%)'};
	box-shadow: ${({ variant }) =>
		variant === 'pink'
			? '0 0 20px rgba(255,79,182,0.4)'
			: '0 0 20px rgba(0,224,255,0.4)'};

	/* Hover effect */
	&::after {
		content: '';
		position: absolute;
		inset: 0;
		background: ${({ variant }) =>
			variant === 'pink'
				? 'radial-gradient(circle at center, rgba(255,255,255,0.15), transparent 70%)'
				: 'radial-gradient(circle at center, rgba(255,255,255,0.2), transparent 70%)'};
		opacity: 0;
		transition: opacity 0.3s ease;
		z-index: 0;
	}

	&:hover::after {
		opacity: 1;
	}

	&:hover {
		transform: scale(1.05);
		box-shadow: ${({ variant }) =>
			variant === 'pink'
				? '0 0 40px rgba(255,79,182,0.6)'
				: '0 0 40px rgba(0,224,255,0.6)'};
	}

	/* Glow pulse on active click */
	&:active {
		transform: scale(0.96);
		filter: brightness(1.2);
	}

	@media (max-width: 640px) {
		width: 80%;
		padding: 0.85rem 1.25rem;
		font-size: 0.9rem;
		min-width: unset;
	}
`
