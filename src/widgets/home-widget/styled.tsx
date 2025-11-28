import styled from 'styled-components'

export const SnapContainer = styled.div`
	background: #05060a;

	@media (min-width: 1024px) {
		height: 100dvh;
		overflow-y: auto;
		scroll-snap-type: y mandatory;
		scroll-behavior: smooth;
		-webkit-overflow-scrolling: touch;

		overscroll-behavior-y: contain;
		scrollbar-width: none;
		background: #05060a;
	}
`

export const Section = styled.section`
	@media (min-width: 1024px) {
		min-height: 100dvh;
		scroll-snap-align: start;
		scroll-snap-stop: normal;
		position: relative;
		display: flex;
	}
`

export const ScrollHint = styled.div`
	position: fixed;
	bottom: 1.1rem;
	left: 46%;
	transform: translate(-47%);
	z-index: 10;

	span {
		display: inline-block;
		color: rgba(255, 255, 255, 0.692);
		font-size: 0.875rem;
		transform: translateY(2.5px);
		transition: color 0.3s ease-in-out;
		cursor: pointer;

		&:hover {
			color: white;
		}
	}

	@media (max-width: 1023px) {
		display: none;
	}
`
