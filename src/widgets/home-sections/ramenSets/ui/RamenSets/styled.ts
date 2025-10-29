import styled, { keyframes } from 'styled-components'
import { motion } from 'framer-motion'

export const Section = styled(motion.section)`
	padding: 100px 0;
	width: 100%;
	min-height: 100vh;
	background: radial-gradient(circle at 30% 15%, #ff4fb610 0%, transparent 55%),
		radial-gradient(circle at 80% 85%, #00e0ff10 0%, transparent 60%);
	color: white;
	position: relative;
	text-align: center;
`

export const Header = styled.h2`
	font-family: 'Geologica';
	font-size: clamp(2rem, 4vw, 3rem);
	margin-bottom: 2.5rem;

	span {
		font-family: 'Zen_Dots';
		background: linear-gradient(90deg, #ff4fb6, #00e0ff);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
	}

	p {
		font-family: 'Geologica';

		font-size: clamp(1rem, 4vw, 1.2rem);
		max-width: 700px;
		margin: 0 auto;
		line-height: 1;

		background: linear-gradient(
			120deg,
			#d0cdcf,
			#d0cdcf,
			#f79ce8db,
			#d0cdcf,
			#d0cdcf
		);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
	}
`

export const Grid = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
	gap: 28px;
	max-width: 1140px;
	margin: 0 auto 3rem;
	padding: 0 12px;

	@media (max-width: 540px) {
		gap: 18px;
	}
`

const hotPulse = keyframes`
  0% { box-shadow: 0 0 5px rgba(255,79,79,0.4); }
  50% { box-shadow: 0 0 10px rgba(255,79,79,0.75); }
  100% { box-shadow: 0 0 5px rgba(255,79,79,0.4); }
`

const newPulse = keyframes`
  0% { box-shadow: 0 0 5px rgba(79, 202, 255, 0.4); }
  50% { box-shadow: 0 0 10px rgba(79, 205, 255, 0.75); }
  100% { box-shadow: 0 0 5px rgba(79, 229, 255, 0.4); }
`

const limitedPulse = keyframes`
  0% { box-shadow: 0 0 5px rgba(255, 249, 79, 0.4); }
  50% { box-shadow: 0 0 10px rgba(255, 226, 79, 0.75); }
  100% { box-shadow: 0 0 5px rgba(234, 255, 79, 0.44); }
`

const mildPulse = keyframes`
  0% { box-shadow: 0 0 5px rgba(79, 255, 161, 0.4); }
  50% { box-shadow: 0 0 10px rgba(79, 255, 138, 0.75); }
  100% { box-shadow: 0 0 5px rgba(79, 255, 217, 0.44); }
`

export const Card = styled(motion.div)`
	position: relative;
	border-radius: 18px;
	display: flex;
	flex-direction: column;
	padding: 14px 14px 18px;
	background: rgba(255, 255, 255, 0.05);
	backdrop-filter: blur(10px);
	overflow: hidden;
	box-shadow: 0 0 24px rgba(0, 0, 0, 0.25);
	transition: transform 0.3s ease, box-shadow 0.4s ease;
	z-index: 1;

	&[data-tone='hot'] {
		animation: ${hotPulse} 3s ease-in-out infinite;
		border: 1px solid rgba(255, 79, 79, 0.6);
	}

	&[data-tone='new'] {
		animation: ${newPulse} 3s ease-in-out infinite;
		border: 1px solid rgba(79, 240, 255, 0.6);
	}
	&[data-tone='limited'] {
		animation: ${limitedPulse} 3s ease-in-out infinite;
		border: 1px solid rgba(232, 255, 79, 0.575);
	}
	&[data-tone='mild'] {
		animation: ${mildPulse} 3s ease-in-out infinite;
		border: 1px solid #aaffd6ac;
	}

	&:hover {
		transform: translateY(-4px) scale(1.02);
		box-shadow: 0 0 40px rgba(255, 79, 182, 0.25);
	}

	h3 {
		margin: 18px 0 6px;
		font-family: 'Zen_Dots';
		font-size: 1.15rem;
		font-weight: 800;
		background: linear-gradient(90deg, #ff4fb6, #00e0ff);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
	}

	p {
		flex: 1;
		color: rgba(255, 255, 255, 0.85);
		font-size: 0.95rem;
		line-height: 1.55;
		min-height: 3.2em;
	}
`

export const GlowBorder = styled.div`
	pointer-events: none;
	position: absolute;
	inset: -1px;
	border-radius: 18px;
	background: linear-gradient(135deg, #000000, #8a01cf35);
	filter: blur(18px) opacity(0.25);
	z-index: -1;
`

export const ImageWrap = styled.div`
	position: relative;
	z-index: 1;
	width: 100%;
	height: 210px;
	border-radius: 14px;
	overflow: hidden;
	box-shadow: 0 0 28px rgba(255, 79, 182, 0.18);

	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
		transform-origin: center;
	}
`

/* Верхний угловой ярлык-лента */
export const Ribbon = styled.div`
	position: absolute;
	top: 12px;
	left: -48px;
	min-width: 200px;
	transform: rotate(-25deg);
	padding: 6px 56px;
	font-size: 0.8rem;
	font-weight: 700;
	letter-spacing: 0.4px;
	color: #0c0c0c;
	z-index: 2;
	background: linear-gradient(90deg, #ffdeef, #9ff6ff);
	box-shadow: 0 0 14px rgba(255, 255, 255, 0.25);

	&[data-tone='hot'] {
		background: #ff5555;
		box-shadow: 0 0 10px #ff5555a8;
		color: #fff;
	}

	&[data-tone='new'] {
		background: #79e1ff;
		box-shadow: 0 0 10px #79e1ffa8;
		color: #042b3a;
	}

	&[data-tone='sale'] {
		background: #ff9fcf;
		box-shadow: 0 0 10px #ff9fcfa8;
		color: #3b0025;
	}

	&[data-tone='limited'] {
		background: #ffe066;
		box-shadow: 0 0 10px #ffe066a8;
		color: #3b2a00;
	}

	&[data-tone='mild'] {
		background: #aaffd6;
		box-shadow: 0 0 10px #aaffd6a8;
		color: #003321;
	}
`

/* Чипы-лейблы под описанием */
export const LabelRow = styled.div`
	display: flex;
	flex-wrap: wrap;
	gap: 8px;
	justify-content: center;
	margin: 8px 0 4px;
`

const glowPulse = keyframes`
  0% { box-shadow: 0 0 10px rgba(255,255,255,0.2); }
  50% { box-shadow: 0 0 20px rgba(255,255,255,0.45); }
  100% { box-shadow: 0 0 10px rgba(255,255,255,0.2); }
`

export const LabelChip = styled.div<{ $discount?: number }>`
	font-family: 'Manrope', sans-serif;
	font-size: 0.78rem;
	padding: 6px 12px;
	border-radius: 999px;
	font-weight: 600;
	color: #fff;
	letter-spacing: 0.3px;
	text-shadow: 0 0 4px rgba(0, 0, 0, 0.3);
	backdrop-filter: blur(6px);
	transition: all 0.3s ease;
	user-select: none;
	display: inline-flex;
	align-items: center;
	justify-content: center;
	animation: ${glowPulse} 3.5s ease-in-out infinite;

	${({ $discount }) => {
		if (!$discount) return ''

		if ($discount < 10)
			return `
        background-color: #9CFFD6;
        color: #00251A;
        box-shadow: 0 0 12px #9CFFD688, inset 0 0 4px #C8FFEA;
      `
		if ($discount < 20)
			return `
        background-color: #FFE24D;
        color: #332400;
        box-shadow: 0 0 12px #FFE24D88, inset 0 0 4px #FFF8C4;
      `
		if ($discount < 30)
			return `
        background-color: #FFA84D;
        color: #2E0E00;
        box-shadow: 0 0 14px #FFA84D99, inset 0 0 5px #FFD1A0;
      `
		if ($discount < 50)
			return `
        background-color: #FF4D6D;
        color: #fff;
        box-shadow: 0 0 16px #FF4D6DAA, inset 0 0 4px #FF9BAA;
      `
		return `
        background-color: #FF00A8;
        color: #fff;
        box-shadow: 0 0 18px #FF00A8AA, inset 0 0 6px #FF8BDF;
      `
	}}

	&:hover {
		transform: scale(1.08);
		filter: brightness(1.15);
	}
`
export const BtnRowTop = styled.div`
	display: flex;
	gap: 10px;
`

export const BtnRow = styled.div`
	margin-top: 12px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	gap: 12px;
	z-index: 1;

	button {
		position: relative;
		background: transparent;
		border: 1px solid rgba(255, 255, 255, 0.25);
		color: #fff;
		font-weight: 600;
		padding: 0.8rem 1.5rem;
		border-radius: 12px;
		cursor: pointer;
		font-family: 'Manrope';
		letter-spacing: 0.3px;
		transition: all 0.3s ease;
		overflow: hidden;

		&:before {
			content: '';
			position: absolute;
			inset: 0;
			border-radius: inherit;
			background: radial-gradient(
				circle at 50% 120%,
				rgba(255, 79, 182, 0.25),
				transparent 70%
			);
			opacity: 0;
			transition: opacity 0.3s ease;
		}

		&:hover {
			border-color: rgba(255, 79, 182, 0.6);
			color: #fff;
			transform: translateY(-2px);
		}

		&:hover:before {
			opacity: 1;
		}

		&:active {
			transform: scale(0.97);
		}
	}
`

export const BottomLink = styled.div`
	text-align: center;
	margin-top: 8px;

	button {
		background: rgba(255, 255, 255, 0.06);
		color: #fff;
		border: 1px solid rgba(255, 255, 255, 0.12);
		padding: 1rem 2rem;
		border-radius: 12px;
		font-family: 'Manrope';
		font-weight: 600;
		transition: all 0.35s ease;
		backdrop-filter: blur(10px);
	}
`
