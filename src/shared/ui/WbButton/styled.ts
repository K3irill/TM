import styled from 'styled-components'

export const WbButtonStyled = styled.div`
	display: flex;
	align-items: center;
	gap: 0.6rem;
	padding: 0.8rem 1.2rem;
	border-radius: 12px;
	background: linear-gradient(120deg, #fd11d9ff, #900de2d9);
	color: #f1f1f1;
	font-weight: 700;
	font-size: 0.95rem;
	text-decoration: none;
	box-shadow: 0 0 20px rgba(231, 27, 146, 0.4);
	transition: all 0.3s ease;
	overflow: hidden;
	position: relative;
	cursor: pointer;

	&:hover {
		box-shadow: 0 0 35px rgba(255, 79, 182, 0.6),
			0 0 60px rgba(221, 0, 255, 0.4);
		filter: brightness(1.08);
	}

	span {
		font-family: 'Geologica';
		letter-spacing: 0.4px;
	}

	svg {
		filter: drop-shadow(0px 0px 10px #ffffff66);
		width: 28px;
		height: 28px;
	}

	@media (max-width: 768px) {
		width: 100%;
		justify-content: center;
		font-size: 0.9rem;
	}
`
