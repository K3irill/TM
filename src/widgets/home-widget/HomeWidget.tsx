// app/page.tsx
'use client'
import React, { useEffect, useState, useRef } from 'react'
import HeroWidget from '@/widgets/home-sections/hero/HeroWidget'
import About from '@/widgets/home-sections/about/ui/About/About'
import RamenSets from '@/widgets/home-sections/ramenSets/ui/RamenSets/RamenSets'
import SectionDots from '@/shared/ui/section-dots/SectionDots'
import FooterRevealButton from '@/shared/ui/FooterRevealButton/FooterRevealButton'

import { motion, useReducedMotion } from 'motion/react'
import Philosophy from '@/widgets/home-sections/philosophy/Philosophy'

import * as S from './styled'
import RamenLoader from '@/shared/ui/WaveLoader/WaveLoader'

export default function HomeWidget() {
	const prefersReduced = useReducedMotion()
	const containerRef = useRef<HTMLDivElement>(null)
	const [width, setWidth] = useState<number>(0)
	const [isClient, setIsClient] = useState(false)

	useEffect(() => {
		setIsClient(true)
		setWidth(window.innerWidth)

		function handleWindowSizeChange() {
			setWidth(window.innerWidth)
		}

		window.addEventListener('resize', handleWindowSizeChange)
		return () => {
			window.removeEventListener('resize', handleWindowSizeChange)
		}
	}, [])

	const isTablet = width <= 1023

	// Эффект для обработки прокрутки
	useEffect(() => {
		const cont = containerRef.current
		if (!cont || isTablet || !isClient) return

		const onWheel = (e: WheelEvent) => {
			const atTop = cont.scrollTop <= 0
			const atBottom =
				cont.scrollTop + cont.clientHeight >= cont.scrollHeight - 1
			const dy = e.deltaY

			if (dy > 0 && atBottom) {
				e.preventDefault()
				window.scrollBy({ top: dy, behavior: 'auto' })
			}

			if (dy < 0 && atTop) {
				e.preventDefault()
				window.scrollBy({ top: dy, behavior: 'auto' })
			}
		}

		let startY = 0
		const onTouchStart = (e: TouchEvent) => (startY = e.touches[0].clientY)
		const onTouchMove = (e: TouchEvent) => {
			const curY = e.touches[0].clientY
			const dy = startY - curY
			const atTop = cont.scrollTop <= 0
			const atBottom =
				cont.scrollTop + cont.clientHeight >= cont.scrollHeight - 1

			if (dy > 0 && atBottom) {
				e.preventDefault()
				window.scrollBy({ top: dy, behavior: 'auto' })
			}

			if (dy < 0 && atTop) {
				e.preventDefault()
				window.scrollBy({ top: dy, behavior: 'auto' })
			}
		}

		cont.addEventListener('wheel', onWheel, { passive: false })
		cont.addEventListener('touchstart', onTouchStart, { passive: true })
		cont.addEventListener('touchmove', onTouchMove, { passive: false })

		return () => {
			cont.removeEventListener('wheel', onWheel)
			cont.removeEventListener('touchstart', onTouchStart)
			cont.removeEventListener('touchmove', onTouchMove)
		}
	}, [isTablet, isClient])

	if (isClient) {
		return (
			<S.SnapContainer ref={containerRef}>
				<div
					style={{
						height: '100vh',
						width: '100dvw',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						fontSize: '18px',
					}}
				>
					<RamenLoader />
				</div>
			</S.SnapContainer>
		)
	}

	return (
		<S.SnapContainer ref={containerRef}>
			<S.Section id='hero'>
				<HeroWidget />
			</S.Section>

			<S.Section id='sets'>
				<RamenSets />
			</S.Section>

			<S.Section id='about'>
				<About />
			</S.Section>

			<S.Section id='philosophy'>
				<Philosophy />
			</S.Section>

			<SectionDots
				containerRef={containerRef}
				sections={['hero', 'sets', 'about', 'philosophy']}
			/>

			<FooterRevealButton containerRef={containerRef} />

			<S.ScrollHint
				as={motion.div}
				onClick={() => {
					const cont = containerRef.current
					if (!cont) return

					const sections = Array.from(
						cont.querySelectorAll('section')
					) as HTMLElement[]

					const scrollTop = cont.scrollTop

					const nextSection = sections.find(
						sec => sec.offsetTop > scrollTop + 1
					)

					if (nextSection) {
						cont.scrollTo({ top: nextSection.offsetTop, behavior: 'smooth' })
					} else if (isClient) {
						window.scrollTo({
							top: document.body.scrollHeight,
							behavior: 'smooth',
						})
					}
				}}
				initial={{ opacity: 0, y: 8 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6, ease: 'easeOut' }}
			>
				<motion.span
					animate={
						prefersReduced
							? { opacity: 0.8 }
							: { y: [0, -6, 0], opacity: [0.6, 1, 0.6] }
					}
					transition={
						prefersReduced
							? { duration: 0.0 }
							: { duration: 2.6, repeat: Infinity, ease: 'easeInOut' }
					}
				>
					↓ Scroll or click to explore
				</motion.span>
			</S.ScrollHint>
		</S.SnapContainer>
	)
}
