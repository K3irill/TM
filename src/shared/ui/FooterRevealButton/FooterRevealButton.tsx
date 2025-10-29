'use client'
import { motion } from 'framer-motion'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'
import styled, { keyframes } from 'styled-components'
import { useEffect, useState } from 'react'

type Props = { containerRef: React.RefObject<HTMLDivElement> }

export default function FooterRevealButton({ containerRef }: Props) {
	const [hovered, setHovered] = useState(false)
	const [atBodyBottom, setAtBodyBottom] = useState(false)

	useEffect(() => {
		const onScroll = () => {
			const nearBottom =
				window.innerHeight + window.scrollY >= document.body.offsetHeight - 40
			setAtBodyBottom(nearBottom)
		}
		onScroll()
		window.addEventListener('scroll', onScroll, { passive: true })
		return () => window.removeEventListener('scroll', onScroll)
	}, [])

	const scrollToFooter = () => {
		window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
	}

	const hideFooter = () => {
		window.scrollTo({ top: 0, behavior: 'smooth' })
	}

	const handleClick = () => {
		atBodyBottom ? hideFooter() : scrollToFooter()
	}

	return (
		<TabWrapper
			as={motion.div}
			initial={{ x: 120, opacity: 0 }}
			animate={{ x: 0, opacity: 1 }}
			transition={{ duration: 0.5, ease: 'easeOut' }}
			onHoverStart={() => setHovered(true)}
			onHoverEnd={() => setHovered(false)}
			onClick={handleClick}
		>
			<NeonEdge animate={hovered} />
			<TabButton
				as={motion.div}
				animate={hovered ? { y: -4, scale: 1.04 } : { y: 0, scale: 1 }}
				transition={{ duration: 0.25 }}
			>
				{atBodyBottom ? <FaChevronUp /> : <FaChevronDown />}
				<span>{atBodyBottom ? 'Скрыть' : 'Навигация'}</span>
			</TabButton>
		</TabWrapper>
	)
}

const pulse = keyframes`
  0% { box-shadow: 0 0 10px rgba(255,79,182,0.4), 0 0 24px rgba(0,224,255,0.3); }
  50% { box-shadow: 0 0 22px rgba(255,79,182,0.8), 0 0 44px rgba(0,224,255,0.5); }
  100% { box-shadow: 0 0 10px rgba(255,79,182,0.4), 0 0 24px rgba(0,224,255,0.3); }
`

const TabWrapper = styled(motion.div)`
	position: fixed;
	bottom: 1.1rem;
	right: 1.1rem;
	z-index: 60;
	cursor: pointer;
	display: flex;
	justify-content: flex-end;
	align-items: flex-end;
	pointer-events: auto;

	@media (max-width: 1023px) {
		display: none;
	}
`

const NeonEdge = styled(motion.div)<{ animate?: boolean }>`
	position: absolute;
	right: 6px;
	bottom: 6px;
	width: 70%;
	height: 2px;
	border-radius: 2px;
	background: linear-gradient(90deg, #ff4fb6, #00e0ff, #ff4fb6);
	background-size: 300% 100%;
	animation: ${pulse} 3s ease-in-out infinite;
	filter: blur(${p => (p.animate ? '3px' : '1px')});
	opacity: 0.85;
`

const TabButton = styled(motion.div)`
	position: relative;
	display: flex;
	align-items: center;
	gap: 0.55rem;
	padding: 0.7rem 1rem;
	border-radius: 16px 16px 0 16px; /* “язычок” справа снизу */
	background: linear-gradient(90deg, #ff4fb6cc, #00e0ffcc);
	color: #0c0c0c;
	font-weight: 700;
	font-family: 'Geologica';
	font-size: 0.9rem;
	letter-spacing: 0.3px;
	animation: ${pulse} 4s infinite ease-in-out;
	box-shadow: 0 0 22px rgba(255, 79, 182, 0.45);
	transition: all 0.3s ease;
	backdrop-filter: blur(10px);

	svg {
		font-size: 0.95rem;
	}
	span {
		font-size: 0.85rem;
		user-select: none;
	}

	&:hover {
		filter: brightness(1.1);
	}
`
