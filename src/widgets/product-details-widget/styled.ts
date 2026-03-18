import styled from 'styled-components'

export const Wrap = styled.main`
	min-height: 100dvh;
	max-width: 1200px;
	margin: 0 auto;
	padding: 8rem 16px 56px;
	color: #fff;

	@media (max-width: 960px) {
		padding: 10.5rem 16px 48px;
	}

	@media (max-width: 520px) {
		padding: 10.5rem 14px 42px;
	}
`

export const Breadcrumbs = styled.nav`
	font-size: 0.9rem;
	color: rgba(255, 255, 255, 0.6);
	display: flex;
	gap: 0.5rem;
	flex-wrap: wrap;
	a {
		color: rgba(255, 255, 255, 0.75);
		text-decoration: none;
		transition: color 0.3s;

		&:hover {
			color: white;
		}
	}
	margin-bottom: 16px;
`

export const Grid = styled.section`
	display: grid;
	grid-template-columns: 6fr 6fr;
	gap: 28px;

	@media (max-width: 960px) {
		grid-template-columns: 1fr;
		gap: 18px;
	}

	@media (max-width: 520px) {
		gap: 14px;
	}
`

export const Left = styled.div`
	min-width: 0;
`

export const Sticky = styled.div`
	position: sticky;
	top: 86px;
	display: grid;
	gap: 12px;
	min-width: 0;

	@media (max-width: 960px) {
		position: static;
		top: auto;
	}
`

export const MainImg = styled.div`
	background: rgba(255, 255, 255, 0.04);
	border: 1px solid rgba(255, 255, 255, 0.08);
	border-radius: 16px;
	padding: 16px;
	backdrop-filter: blur(8px);
	box-shadow: 0 0 24px rgba(255, 79, 182, 0.12);
	width: min(520px, 100%);
	max-width: 520px;
	margin: 0 auto;
	min-width: 0;

	.swiper {
		width: 100%;
		max-width: 100%;
		overflow: hidden;
		min-width: 0;
	}

	/* hard-fix: prevent insane wrapper width when Swiper mis-measures container */
	.swiper-wrapper {
		max-width: 100% !important;
		width: 100% !important;
	}

	.swiper-slide {
		display: flex;
		align-items: center;
		justify-content: center;
		max-width: 100%;
		width: 100% !important;
		min-width: 0;
	}

	.swiper-slide img {
		width: 100%;
		height: auto;
		max-height: 520px;
		display: block;
		object-fit: contain;
	}

	@media (max-width: 960px) {
		width: 100%;
		max-width: 640px;
		padding: 14px;
		border-radius: 14px;

		.swiper-slide img {
			max-height: 520px;
		}
	}

	@media (max-width: 520px) {
		max-width: 100%;
		padding: 12px;
		border-radius: 12px;

		.swiper-slide img {
			max-height: 360px;
		}
	}
`

export const ThumbsWrap = styled.div`
	overflow: hidden;
	width: min(520px, 100%);
	max-width: 520px;
	margin: 0 auto;
	min-width: 0;

	.swiper {
		width: 100%;
		min-width: 0;
	}

	.swiper-slide {
		width: 88px !important;
		height: 88px;
		opacity: 0.6;
		transition: opacity 0.2s ease, transform 0.2s ease;
	}

	.swiper-slide-thumb-active {
		opacity: 1;
	}

	img {
		width: 88px;
		height: 88px;
		object-fit: contain;
		display: block;
		border-radius: 10px;
		border: 1px solid rgba(255, 255, 255, 0.12);
		background: rgba(255, 255, 255, 0.05);
		padding: 6px;
	}

	@media (max-width: 960px) {
		width: 100%;
		max-width: 640px;
	}

	@media (max-width: 520px) {
		max-width: 100%;

		.swiper-slide {
			width: 72px !important;
			height: 72px;
		}

		img {
			width: 72px;
			height: 72px;
			border-radius: 10px;
			padding: 6px;
		}
	}
`

export const Right = styled.div``

export const TitleRow = styled.header`
	display: flex;
	flex-wrap: wrap;
	gap: 10px 14px;
	align-items: center;
	margin-bottom: 8px;

	h1 {
		margin: 0;
		font-size: clamp(1.6rem, 4vw, 2.2rem);
		font-family: 'Geologica';
		background: linear-gradient(90deg, #ff4fb6, #00e0ff);
		background-clip: text;
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
	}
`

export const Badge = styled.span`
	font-size: 0.75rem;
	padding: 0.25rem 0.55rem;
	border-radius: 999px;
	border: 1px solid rgba(255, 255, 255, 0.18);
	background: rgba(255, 255, 255, 0.06);
	letter-spacing: 0.3px;

	&[data-tone='hot'] {
		border-color: #ff4fb6;
		color: #ffbde5;
	}
	&[data-tone='new'] {
		border-color: #00e0ff;
		color: #c9f7ff;
	}
	&[data-tone='limited'] {
		border-color: #ffd166;
		color: #ffe9b0;
	}
	&[data-tone='sale'] {
		border-color: #9aff8a;
		color: #d8ffd3;
	}
`

export const Short = styled.p`
	color: rgba(255, 255, 255, 0.78);
	margin: 6px 0 16px;
`

export const PriceRow = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	gap: 14px;
	flex-wrap: wrap;
	margin-bottom: 14px;

	.price {
		display: flex;
		align-items: center;
		gap: 10px;
		strong {
			font-size: 1.8rem;
		}
		s {
			color: rgba(255, 255, 255, 0.5);
		}
	}
	.cta {
		display: flex;
		gap: 8px;
		flex-wrap: wrap;
		a,
		button {
			white-space: nowrap;
		}
	}

	@media (max-width: 520px) {
		.price {
			strong {
				font-size: 1.55rem;
			}
		}
		.cta {
			width: 100%;
			a {
				flex: 1 1 220px;
			}
			a > button {
				width: 100%;
			}
		}
	}
`

export const Divider = styled.div`
	height: 1px;
	background: linear-gradient(90deg, #ff4fb6, #00e0ff);
	opacity: 0.35;
	margin: 14px 0 12px;
`

export const Tabs = styled.div`
	display: flex;
	gap: 8px;
	flex-wrap: wrap;
	margin-bottom: 8px;
	button {
		border: 1px solid rgba(255, 255, 255, 0.14);
		background: rgba(255, 255, 255, 0.06);
		color: #fff;
		border-radius: 10px;
		padding: 0.5rem 0.8rem;
		cursor: pointer;
		transition: all 0.2s ease;
	}
	button[data-active='true'] {
		border-color: #00e0ff;
		box-shadow: 0 0 16px rgba(0, 224, 255, 0.25);
	}

	@media (max-width: 520px) {
		gap: 6px;
		button {
			flex: 1 1 calc(50% - 6px);
			justify-content: center;
			padding: 0.55rem 0.7rem;
		}
	}
`

export const TabBody = styled.div`
	color: rgba(255, 255, 255, 0.8);
	line-height: 1.7;
	p {
		margin: 0;
	}
`

export const SpecTable = styled.ul`
	list-style: none;
	margin: 0;
	padding: 0;
	display: grid;
	gap: 8px;
	li {
		display: grid;
		grid-template-columns: 180px 1fr;
		gap: 10px;
		align-items: center;
		background: rgba(255, 255, 255, 0.04);
		border-radius: 10px;
		padding: 0.6rem 0.8rem;
		@media (max-width: 520px) {
			grid-template-columns: 1fr;
		}
	}
	span {
		color: rgba(255, 255, 255, 0.6);
	}
	i {
		display: block;
		height: 1px;
		background: rgba(255, 255, 255, 0.06);
		opacity: 0.6;
	}
	b {
		font-weight: 600;
	}
`

export const SmallNote = styled.p`
	margin-top: 12px;
	font-size: 0.85rem;
	color: rgba(255, 255,  255, 0.55);
	backdrop-filter: blur(2px);
`

export const Empty = styled.div`
	max-width: 900px;
	margin: 0 auto;
	padding: 60px 16px;
	text-align: center;
	color: #fff;
	a {
		color: #00e0ff;
		text-decoration: none;
	}
`

