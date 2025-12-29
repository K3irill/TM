import styled from 'styled-components'

export const FooterWrapper = styled.footer`
	position: relative;
	padding: 64px 20px 28px;

	backdrop-filter: blur(12px);
	border-top: 1px solid rgba(255, 255, 255, 0.06);
	overflow: hidden;
	color: #fff;
	position: relative;
	z-index: 11;
`

export const TopGlow = styled.div`
	position: absolute;
	inset: -40% -20% auto -20%;
	height: 280px;
	background: radial-gradient(circle at 20% 40%, #ff4fb622 0%, transparent 60%),
		radial-gradient(circle at 80% 50%, #00e0ff22 0%, transparent 60%);
	filter: blur(60px);
	pointer-events: none;
`

export const Grid = styled.div`
	max-width: 1200px;
	margin: 0 auto;
	position: relative;
	display: grid;
	grid-template-columns: repeat(12, 1fr);
	gap: 28px;

	@media (max-width: 1024px) {
		grid-template-columns: repeat(8, 1fr);
	}
	@media (max-width: 768px) {
		grid-template-columns: repeat(4, 1fr);
		gap: 20px;
	}
`

export const Col = styled.div`
	grid-column: span 3;
	@media (max-width: 1024px) {
		grid-column: span 4;
	}
	@media (max-width: 768px) {
		grid-column: span 4;
	}
`

export const ColWide = styled.div`
	grid-column: span 6;
	@media (max-width: 1024px) {
		grid-column: span 8;
	}
	@media (max-width: 768px) {
		grid-column: span 4;
	}
`

export const BrandRow = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.4rem;
	margin-bottom: 10px;

	svg {
		width: 45px;
		height: 45px;
	}

	p {
		font-size: 0.95rem;
		font-family: 'Inter', sans-serif;
	}
`

export const Logo = styled.div`
	font-family: 'Zen_Dots';
	font-size: 1.8rem;
	display: flex;
	align-items: center;
	gap: 0.5rem;
	span {
		background: linear-gradient(90deg, #ff4fb6, #00e0ff);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
	}
`

export const ColTitle = styled.h4`
	font-family: 'Geologica', sans-serif;
	font-weight: 800;
	font-size: 1.05rem;
	letter-spacing: 0.4px;
	margin: 0 0 0.8rem;
	background: linear-gradient(90deg, #ff4fb6, #00e0ff);
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
`

export const Text = styled.p`
	color: rgba(255, 255, 255, 0.65);
	line-height: 1.6;
	font-size: 0.8rem;
	max-width: 38ch;
	display: flex;
	flex-direction: column;
	gap: 10px;
`

export const LinkList = styled.ul`
	list-style: none;
	padding: 0;
	margin: 0;
	display: grid;
	gap: 0.5rem;

	a {
		color: rgba(255, 255, 255, 0.78);
		text-decoration: none;
		position: relative;
		transition: color 0.25s ease;
	}

	a::after {
		content: '';
		position: absolute;
		left: 0;
		bottom: -3px;
		width: 100%;
		height: 2px;
		border-radius: 2px;
		background: linear-gradient(90deg, #ff4fb6, #00e0ff);
		transform: scaleX(0);
		transform-origin: right;
		transition: transform 0.35s ease;
	}

	a:hover {
		color: #fff;
	}
	a:hover::after {
		transform: scaleX(1);
		transform-origin: left;
	}
`

export const DisabledLink = styled.span<{ soon?: boolean }>`
	position: relative;
	display: inline-block;
	color: rgba(163, 162, 162, 0.45);
	font-weight: 500;
	cursor: default;
	user-select: none;
	font-family: 'Geologica', sans-serif;
	transition: all 0.3s ease;
	pointer-events: none;
	&:hover {
		color: rgba(255, 255, 255, 0.6);
	}

	${({ soon }) =>
		soon &&
		`
    &::after {
      content: "Скоро";
      position: absolute;
      top: 20%;
  
      right: -3.2rem;
      font-size: 0.6rem;
      text-transform: uppercase;
      color: #fff;
      padding: 0.15rem 0.35rem;
      border-radius: 4px;
      background: linear-gradient(90deg, #ff4fb6, #00e0ff);
  //  animation: pulse 2.4s infinite ease-in-out;
      opacity: 0.9;
    }

    @keyframes pulse {
      0% { filter: drop-shadow(0 0 3px #ff4fb6); opacity: .9; transform: translateY(0);}
      50% { filter: drop-shadow(0 0 6px #00e0ff); opacity: 1; transform: translateY(-1px);}
      100% { filter: drop-shadow(0 0 3px #ff4fb6); opacity: .9; transform: translateY(0);}
    }
  `}
`

export const ContactList = styled.ul`
	list-style: none;
	padding: 0;
	margin: 0;
	display: grid;
	gap: 0.55rem;

	li {
		display: flex;
		align-items: center;
		gap: 0.6rem;
		color: rgba(255, 255, 255, 0.85);
		svg {
			opacity: 0.85;
		}
	}
	a {
		color: rgba(255, 255, 255, 0.85);
		text-decoration: none;
	}
`

export const Socials = styled.div`
	display: flex;
	gap: 0.9rem;
	margin-top: 0.9rem;

	a {
		color: #00e0ff;

		font-weight: 700;
		font-size: 1rem;
		transition: transform 0.25s ease, text-shadow 0.25s ease, color 0.25s ease;
		filter: drop-shadow(0px 0px 5px #29a1dc);
		gap: 10px;
		display: flex;
		flex-direction: row;
		width: 100%;
		svg {
			width: 25px;
		}
	}
	&:hover {
		color: #00e0ff;
		text-shadow: 0 0 10px #00e0ff;
	}
`

export const HighlightStore = styled.div`
	margin-top: 1rem;
	display: flex;
	justify-content: flex-start;
	align-items: center;

	a {
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
	}

	a:hover {
		box-shadow: 0 0 35px rgba(255, 79, 182, 0.6),
			0 0 60px rgba(221, 0, 255, 0.4);
		filter: brightness(1.08);
	}

	span {
		font-family: 'Geologica';
		letter-spacing: 0.4px;
	}

	svg {
		width: 28px;
		height: 28px;
	}

	@media (max-width: 768px) {
		justify-content: center;
		a {
			width: 100%;
			justify-content: center;
			font-size: 0.9rem;
		}
	}
`

export const Form = styled.form`
	margin-top: 0.6rem;
	display: flex;
	gap: 0.6rem;
	align-items: center;
	input {
		flex: 1;
		background: rgba(255, 255, 255, 0.06);
		border: 1px solid rgba(255, 255, 255, 0.12);
		color: #fff;
		border-radius: 10px;
		padding: 0.8rem 1rem;
		outline: none;
		transition: border 0.25s ease, box-shadow 0.25s ease;
	}
	input::placeholder {
		color: rgba(255, 255, 255, 0.5);
	}
	input:focus {
		border-color: rgba(0, 224, 255, 0.6);
		box-shadow: 0 0 0 3px rgba(0, 224, 255, 0.18);
	}

	button {
		border: none;
		border-radius: 10px;
		cursor: pointer;
		padding: 0.85rem 1.1rem;
		font-weight: 700;
		color: #0c0c0c;
		background: linear-gradient(135deg, #00e0ff, #a2fff9);
		box-shadow: 0 0 16px rgba(0, 224, 255, 0.3);
		transition: filter 0.25s ease, box-shadow 0.25s ease;
	}
	button:hover {
		filter: brightness(1.05);
		box-shadow: 0 0 26px rgba(0, 224, 255, 0.45);
	}

	@media (max-width: 768px) {
		flex-direction: column;
		align-items: stretch;
		button {
			width: 100%;
		}
	}
`

export const Bottom = styled.div`
	max-width: 1200px;
	margin: 32px auto 0;
	text-align: center;
	position: relative;
	.line {
		height: 2px;
		margin-bottom: 0.9rem;
		background: linear-gradient(90deg, #ff4fb6, #00e0ff);
		animation: grow 1.2s ease forwards;
		width: 0%;
	}
	p {
		color: rgba(255, 255, 255, 0.45);
		font-size: 0.9rem;
	}
	@keyframes grow {
		to {
			width: 100%;
		}
	}
`

export const StoreBtns = styled.div`
	margin-top: 10px;
	display: flex;
	flex-direction: column;
	gap: 12px;
`
