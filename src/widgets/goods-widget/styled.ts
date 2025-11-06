import { motion } from 'motion/react'
import styled, { keyframes } from 'styled-components'

export const Wrap = styled(motion.div)`
	padding: 11rem 20px 80px;
	min-height: 100dvh;
	color: #fff;
	max-width: 1300px;
	margin: 0 auto;
`
export const Header = styled.div`
	text-align: center;
	margin-bottom: 40px;
	h1 {
		font-family: 'Geologica';
		font-size: clamp(2rem, 4vw, 3rem);
		span:nth-child(2) {
			font-family: 'Zen_Dots';
			background: linear-gradient(90deg, #ff4fb6, #00e0ff);
			-webkit-background-clip: text;
			-webkit-text-fill-color: transparent;
		}
	}
	p {
		color: rgba(255, 255, 255, 0.7);
		max-width: 600px;
		margin: 10px auto 0;
	}
`

export const Filters = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 40px;
	flex-wrap: wrap;
	gap: 16px;
	.cats {
		display: flex;
		gap: 10px;
		flex-wrap: wrap;
	}
	button {
		background: rgba(255, 255, 255, 0.06);
		border: 1px solid rgba(255, 255, 255, 0.1);
		color: #fff;
		border-radius: 10px;
		padding: 0.6rem 1rem;
		cursor: pointer;
		transition: 0.25s ease;
	}
	button[data-active='true'] {
		border-color: #00e0ff;
		box-shadow: 0 0 14px rgba(0, 224, 255, 0.25);
	}
	select {
		background: rgba(255, 255, 255, 0.126);
		border: 1px solid rgba(32, 32, 32, 0.831);
		color: #fff;
		border-radius: 10px;
		padding: 0.6rem 1rem;
		align-self: end;
		option {
			background: #2a2929;
			color: #fff;
		}
	}

	@media (max-width: 767px) {
		button {
			padding: 0.4rem 0.6rem;
			font-size: 0.9rem;
		}
	}
`

export const SelectWrap = styled.div`
	width: 100%;
	display: flex;

	justify-content: end;
`

export const Grid = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
	gap: 26px;

	@media (max-width: 767px) {
		gap: 5px;
		grid-template-columns: repeat(2, 1fr);
	}
`

export const Card = styled(motion.div)`
	position: relative;
	background: rgba(255, 255, 255, 0.03);
	border: 1px solid rgba(255, 255, 255, 0.08);
	border-radius: 20px;

	text-align: start;
	overflow: hidden;

	/* тускнение для "скоро/нет" */
	&[data-state='soon'],
	&[data-state='oos'] {
		opacity: 0.7;
	}

	h3 {
		font-family: 'Geologica';
		margin: 12px 0 4px;
	}
	p {
		color: rgba(255, 255, 255, 0.7);
		font-size: 0.9rem;
		min-height: 40px;
	}

	@media (max-width: 767px) {
		h3 {
			margin: 6px 0 4px;
		}
	}
`

export const Content = styled.div`
	padding: 16px;

	display: flex;
	flex-direction: column;

	@media (max-width: 767px) {
		padding: 6px 8px;
	}
`

export const Glow = styled.div`
	position: absolute;
	inset: 0;
	background: radial-gradient(
		circle at 50% 30%,
		rgba(255, 79, 182, 0.1),
		transparent 70%
	);
	z-index: -1;
`

export const ImgWrap = styled.div`
	position: relative;
	z-index: 1;
	img {
		width: 100%;
		height: 420px;
		object-fit: contain;
	}
`

export const Ribbon = styled.div`
	position: absolute;
	top: 8px;
	left: -24px;
	min-width: 220px;
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
		color: #fff;
		box-shadow: 0 0 10px #ff5555a8;
	}
	&[data-tone='new'] {
		background: #79e1ff;
		color: #042b3a;
		box-shadow: 0 0 10px #79e1ffa8;
	}
	&[data-tone='sale'] {
		background: #ff9fcf;
		color: #3b0025;
		box-shadow: 0 0 10px #ff9fcfa8;
	}
	&[data-tone='limited'] {
		background: #66ff70;
		color: #3b2a00;
		box-shadow: 0 0 10px #73ff66a8;
	}

	&[data-tone='empty'] {
		background: #ffe066;
		color: #3b2a00;
		box-shadow: 0 0 10px #ffe066a8;
	}
	&[data-tone='mild'] {
		background: #aaffd6;
		color: #003321;
		box-shadow: 0 0 10px #aaffd6a8;
	}
`

export const DimBadge = styled.div`
	position: absolute;
	inset: 0;

	padding: 0.5rem 0.8rem;
	font-weight: 800;
	letter-spacing: 0.6px;
	font-size: 0.8rem;
	text-transform: uppercase;
	backdrop-filter: blur(6px);
	display: flex;
	justify-content: center;
	align-items: center;

	&[data-variant='soon'] {
		background: rgba(255, 224, 102, 0.18);
		border: 1px solid rgba(255, 224, 102, 0.4);
		color: #fafafa;
	}
	&[data-variant='oos'] {
		background: rgba(255, 85, 85, 0.18);
		border: 1px solid rgba(255, 85, 85, 0.45);
		color: #ffd7d7;
	}
`

export const PriceRow = styled.div`
	margin: 8px 0 12px;
	display: flex;
	justify-content: start;
	align-items: center;
	gap: 10px;
	.left {
		display: flex;
		align-items: start;

		gap: 10px;
		strong {
			font-size: 1.8rem;
			font-weight: 800;
			background: linear-gradient(90deg, #ff4fb6, #00e0ff);
			-webkit-background-clip: text;
			-webkit-text-fill-color: transparent;
			text-shadow: 0 0 12px rgba(0, 224, 255, 0.15);
		}
		s {
			white-space: nowrap;
			position: relative;
			color: rgba(255, 255, 255, 0.55);
		}
		s::after {
			content: '';
			position: absolute;
			left: 0;
			right: 0;
			top: 50%;
			height: 2px;
			background: grey;
			transform: translateY(-50%) skewY(-4deg);
			opacity: 0.6;
		}
	}
	@media (max-width: 767px) {
		margin: 4px 0 6px;
		.left {
			strong {
				font-size: 1rem;
				white-space: nowrap;
			}
			s {
				font-size: 0.8rem;
			}
		}
	}
`

export const SaveTag = styled.span`
	font-size: 0.75rem;
	font-weight: 800;
	color: #ffffff;
	padding: 0.25rem 0.5rem;
	border-radius: 999px;
	background: linear-gradient(120deg, #ff3434, #ff3434, #d900ff);
	box-shadow: 0 0 12px rgba(255, 79, 226, 0.35);
`

export const BtnRow = styled.div`
	display: flex;
	margin-top: 10px;
	justify-content: start;
	a[aria-disabled='true'] {
		pointer-events: none;
	}
	button {
		border: none;
		border-radius: 10px;
		background: linear-gradient(90deg, #ff4fb6, #00e0ff);
		color: #0c0c0c;
		font-weight: 700;
		padding: 0.6rem 1.1rem;
		cursor: pointer;
		transition: 0.25s;
	}
	[disabled] {
		opacity: 0.7;
		cursor: not-allowed;
		filter: grayscale(0.2);
	}
	button:hover {
		filter: drop-shadow(0 0 10px #0091ff80);
	}

	@media (max-width: 767px) {
		button {
			font-size: 0.8rem;
			padding: 0.6rem 0.8rem;
		}
	}
`

export const Pagination = styled.div`
	display: flex;
	justify-content: center;
	gap: 10px;
	margin-top: 40px;
	button {
		background: rgba(255, 255, 255, 0.06);
		border: 1px solid rgba(255, 255, 255, 0.1);
		color: #fff;
		border-radius: 8px;
		width: 36px;
		height: 36px;
		cursor: pointer;
		transition: 0.2s;
	}
	button[data-active='true'] {
		border-color: #00e0ff;
		box-shadow: 0 0 12px rgba(0, 224, 255, 0.25);
	}
`
