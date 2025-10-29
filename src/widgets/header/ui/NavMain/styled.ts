import styled from 'styled-components'

export const NavMain = styled.nav`
	display: flex;
	justify-content: center;
	align-items: center;

	ul {
		display: flex;
		gap: 2.2rem;
		list-style: none;
		padding: 0;
		margin: 0;

		@media (max-width: 768px) {
			gap: 1.4rem;
		}
	}

	li {
		position: relative;
	}

	a {
		text-decoration: none;
		color: rgba(255, 255, 255, 0.85);
		font-weight: 500;
		font-size: 1.05rem;
		letter-spacing: 0.4px;
		transition: color 0.3s ease;
		display: inline-block;

		span {
			position: relative;
			cursor: pointer;
		}

		.underline {
			position: absolute;
			left: 0;
			bottom: -4px;
			height: 2px;
			width: 100%;
			background: linear-gradient(90deg, #ff4fb6, #00e0ff);
			transform-origin: left;
			transform: scaleX(0);
			transition: transform 0.3s ease;
			border-radius: 1px;
			opacity: 0.9;
		}

		&:hover .underline {
			transform: scaleX(1);
		}
	}

	li[data-active='true'] span {
		color: #ff4fb6;
	}

	@media (max-width: 640px) {
		a {
			font-size: 0.9rem;
		}
	}
`
