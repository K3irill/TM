'use client'
import React, { useRef, useState } from 'react'
import {
	motion,
	useMotionValue,
	useReducedMotion,
	useSpring,
	useTransform,
	AnimatePresence,
} from 'framer-motion'
import {
	BackgroundLayer,
	BackgroundVideo,
	Button,
	ButtonGroup,
	Content,
	Description,
	Icon,
	Inner,
	Title,
	Wrapper,
} from './styled'
import { ContainerStyled } from '@/shared/ui/container/styled'
import { useRouter } from 'next/navigation'

type Props = { onScrollNext?: () => void }

export default function HeroWidget({ onScrollNext }: Props) {
	const [isLampOn, setLampOn] = useState(true)
	const router = useRouter()
	const ref = useRef<HTMLDivElement>(null)

	const mx = useMotionValue(0)
	const my = useMotionValue(0)
	const sx = useSpring(mx, { stiffness: 120, damping: 20 })
	const sy = useSpring(my, { stiffness: 120, damping: 20 })
	const layer1X = useTransform(sx, v => v * 20)
	const layer1Y = useTransform(sy, v => v * 20)
	const layer2X = useTransform(sx, v => v * 35)
	const layer2Y = useTransform(sy, v => v * 35)

	const handleMove = (e: React.MouseEvent) => {
		const el = ref.current
		if (!el) return
		const rect = el.getBoundingClientRect()
		const x = (e.clientX - rect.left) / rect.width
		const y = (e.clientY - rect.top) / rect.height
		mx.set((x - 0.5) * 2)
		my.set((y - 0.5) * 2)
	}
	const handleLeave = () => {
		mx.set(0)
		my.set(0)
	}

	const lampVariants = {
		on: {
			scale: 1.1,
			filter: 'brightness(1.2) drop-shadow(0 0 25px rgba(255,79,182,0.8))',
			textShadow:
				'0 0 20px rgba(255,155,79,0.8), 0 0 40px rgba(255,79,182,0.6)',
			transition: { duration: 0.6, ease: 'easeInOut' },
		},
		off: {
			scale: 1,
			filter: 'brightness(0.4)',
			textShadow: 'none',
			transition: { duration: 0.6, ease: 'easeInOut' },
		},
	}

	const brightnessVariants = {
		on: {
			filter: 'brightness(1) ',

			transition: { duration: 0.6, ease: 'easeInOut' },
		},
		off: {
			filter: 'brightness(0.5)',

			transition: { duration: 0.6, ease: 'easeInOut' },
		},
	}

	return (
		<Wrapper
			as={motion.div}
			ref={ref}
			onMouseMove={handleMove}
			onMouseLeave={handleLeave}
			variants={brightnessVariants}
			animate={isLampOn ? 'on' : 'off'}
		>
			<BackgroundVideo
				as={motion.video}
				style={{ x: layer1X, y: layer1Y, scale: 1.05 }}
				$blur='3px'
				$brightness='0.4'
				autoPlay
				muted
				loop
				playsInline
				preload='metadata'
				poster='./back-7.jpg'
			>
				<source src='/videos/back.mp4' type='video/mp4' />
				Ваш браузер не поддерживает воспроизведение видео.
			</BackgroundVideo>

			<BackgroundLayer
				as={motion.div}
				style={{ x: layer2X, y: layer2Y, scale: 1.08 }}
				$gradient='radial-gradient(circle at 40% 45%, #f302ab33, transparent 60%),
               radial-gradient(circle at 70% 60%, #00e0ff33, transparent 55%)'
			/>

			<ContainerStyled>
				<Inner>
					<Content>
						<motion.div
							variants={lampVariants}
							animate={isLampOn ? 'on' : 'off'}
							onClick={() => setLampOn(prev => !prev)}
							style={{ cursor: 'pointer' }}
						>
							<Icon $isLampOn={isLampOn}>🏮</Icon>
						</motion.div>

						<Title>
							<span>타리미</span>
							<span>TARIMI</span>
							<span>Корейский вечер дома 🍜</span>
						</Title>

						<Description>
							Рамены, снеки и наборы вдохновленные К-Дорамами.
							<br />
							Ощутите вкус и душу Сеула.
						</Description>

						<ButtonGroup>
							<Button onClick={() => router.push('/goods')} variant='pink'>
								Вкусности
							</Button>
							<Button onClick={() => router.push('/goods?sets')} variant='blue'>
								Посмотреть Наборы
							</Button>
						</ButtonGroup>
					</Content>
				</Inner>
			</ContainerStyled>
		</Wrapper>
	)
}
