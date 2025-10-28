'use client'

import React, { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, EffectCoverflow } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/effect-coverflow'

import * as S from './styled'
import Container from '@/shared/ui/container/Container'

const About = () => {
	const mx = useMotionValue(0)
	const my = useMotionValue(0)
	const rotateY = useSpring(useTransform(mx, [-1, 1], [-10, 10]), {
		stiffness: 100,
		damping: 20,
	})
	const rotateX = useSpring(useTransform(my, [-1, 1], [10, -10]), {
		stiffness: 100,
		damping: 20,
	})

	const handleMouseMove = (e: React.MouseEvent) => {
		const { width, height, left, top } = e.currentTarget.getBoundingClientRect()
		const x = (e.clientX - left) / width
		const y = (e.clientY - top) / height
		mx.set(x * 2 - 1)
		my.set(y * 2 - 1)
	}

	const handleLeave = () => {
		mx.set(0)
		my.set(0)
	}

	const slides = ['/about.jpg', '/back-1.jpg', '/back-2.jpg', '/back-3.jpg']

	return (
		<S.AboutWrapper
			initial={{ opacity: 0 }}
			whileInView={{ opacity: 1 }}
			viewport={{ once: true, margin: '-100px' }}
		>
			<S.Header
				initial={{ y: 30, opacity: 0 }}
				whileInView={{ y: 0, opacity: 1 }}
				transition={{ duration: 0.6 }}
			>
				О бренде <span>TARIMI</span>
			</S.Header>

			<S.AboutBody onMouseMove={handleMouseMove} onMouseLeave={handleLeave}>
				<motion.div
					style={{
						rotateX,
						rotateY,
						transformStyle: 'preserve-3d',
					}}
				>
					<S.SliderWrapper>
						<Swiper
							modules={[Autoplay, EffectCoverflow]}
							effect='coverflow'
							centeredSlides
							slidesPerView={1.5}
							spaceBetween={-80}
							coverflowEffect={{
								rotate: 15,
								stretch: 0,
								depth: 150,
								modifier: 2,
								slideShadows: true,
							}}
							breakpoints={{
								768: { slidesPerView: 2.5, spaceBetween: -100 },
								1024: { slidesPerView: 3, spaceBetween: -120 },
							}}
							loop
							autoplay={{ delay: 3500, disableOnInteraction: false }}
							className='tarimi-swiper'
						>
							{slides.map((img, i) => (
								<SwiperSlide key={i}>
									<motion.img
										src={img}
										alt='tarimi'
										initial={{ opacity: 0, scale: 1.05 }}
										whileInView={{ opacity: 1, scale: 1 }}
										transition={{ duration: 1 }}
									/>
								</SwiperSlide>
							))}
						</Swiper>
					</S.SliderWrapper>
				</motion.div>

				<S.TextWrapper
					initial={{ opacity: 0, x: 50 }}
					whileInView={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.6, ease: 'easeOut' }}
				>
					<h3>Тёплый свет Сеула — в твоём доме 🏮</h3>
					<p>
						<strong>TARIMI</strong> родился из любви к вечерам, когда хочется
						уюта, пакета любимых снеков и дорамы на фоне. Мы собрали всё, что
						делает эти вечера особенными — от вкуса до атмосферы.
					</p>
					<p>
						Каждый бокс — это тщательно подобранные вкусы, закуски и детали,
						чтобы создать свой <em>“K-night at home”</em>. Ты включаешь любимую
						дораму, завариваешь рамен — и Сеул уже рядом.
					</p>
					<S.Highlight>💫 — корейский вечер дома начинается здесь.</S.Highlight>
				</S.TextWrapper>
			</S.AboutBody>
		</S.AboutWrapper>
	)
}

export default About
