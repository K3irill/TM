import styled from 'styled-components'

export const HeaderWrapper = styled.header`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	z-index: 100;
	background: rgba(0, 0, 0, 0.45);
	border-bottom: 1px solid rgba(255, 255, 255, 0.05);
	overflow: hidden;
	backdrop-filter: blur(8px);
	box-shadow: 0 0 25px rgba(0, 0, 0, 0.25);
`

export const HeaderBlur = styled.div`
	position: absolute;
	inset: 0;
	background: rgba(147, 197, 253, 0.05);
	backdrop-filter: blur(6px);
	z-index: 1;
`

export const HeaderInner = styled.div`
	position: relative;
	z-index: 2;
`

export const HeaderContent = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 20px 0;
	gap: 2rem;

	@media (max-width: 768px) {
		flex-direction: column;
		gap: 1rem;
		padding: 16px 0;
	}
`

export const NavCenter = styled.nav`
	flex: 1;
	display: flex;
	justify-content: center;
	align-items: center;

	ul {
		display: flex;
		gap: 2rem;
		list-style: none;

		a {
			color: rgba(255, 255, 255, 0.8);
			text-decoration: none;
			font-weight: 500;
			letter-spacing: 0.5px;
			position: relative;
			transition: 0.3s ease;

			&:hover {
				color: #ff4fb6;
				text-shadow: 0 0 10px #ff4fb6;
			}
		}
	}

	@media (max-width: 768px) {
		ul {
			gap: 1.2rem;
			font-size: 0.9rem;
		}
	}
`

export const Socials = styled.div`
	display: flex;
	align-items: center;
	gap: 1.25rem;

	a {
		color: rgba(255, 255, 255, 0.7);
		font-size: 1.3rem;
		transition: all 0.3s ease;
		display: flex;
		align-items: center;
		justify-content: center;

		&:hover {
			color: #00e0ff;
			text-shadow: 0 0 10px #00e0ff;
			transform: translateY(-2px);
		}
	}

	@media (max-width: 768px) {
		gap: 1rem;
		font-size: 1.1rem;
	}
`
