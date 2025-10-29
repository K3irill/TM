'use client'
import { motion } from 'framer-motion'
import * as S from './styled'
import Container from '@/shared/ui/container/Container'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, EffectFade } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/effect-fade'

const About = () => {
	const images = [
		'/images/about/1.png',
		'/images/about/2.png',
		'/images/about/3.png',
	]

	return (
		<S.AboutSection
			initial={{ opacity: 0 }}
			whileInView={{ opacity: 1 }}
			viewport={{ once: true, margin: '-100px' }}
		>
			<Container>
				<S.AboutTitle
					as={motion.h2}
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
				>
					О бренде <span>TARIMI</span>
				</S.AboutTitle>

				<S.AboutContent>
					<S.ImageWrapper
						initial={{ scale: 0.9, opacity: 0 }}
						whileInView={{ scale: 1, opacity: 1 }}
						transition={{ type: 'spring', stiffness: 80, damping: 18 }}
					>
						<Swiper
							modules={[Autoplay, EffectFade]}
							effect='fade'
							autoplay={{ delay: 3000, disableOnInteraction: false }}
							loop
							speed={1000}
						>
							{images.map((src, i) => (
								<SwiperSlide key={i}>
									<motion.img
										src={src}
										alt='TARIMI lifestyle'
										initial={{ scale: 1.05 }}
										whileInView={{ scale: 1 }}
										transition={{ duration: 1.2 }}
									/>
								</SwiperSlide>
							))}
						</Swiper>
					</S.ImageWrapper>

					<S.TextWrapper
						initial={{ x: 40, opacity: 0 }}
						whileInView={{ x: 0, opacity: 1 }}
						transition={{ type: 'spring', stiffness: 80, damping: 20 }}
					>
						<h3>Корейский вечер дома начинается здесь 🍜</h3>
						<p>
							<strong>TARIMI</strong> — это не просто наборы с раменом. Это
							атмосфера уюта, тепла и неоновых огней Сеула, собранная в одной
							коробке. Мы вдохновляемся корейскими дорамами и культурой
							совместных вечеров.
						</p>
						<p>
							Каждый бокс — это тщательно подобранные вкусы, закуски и детали,
							чтобы создать свой <em>“K-night at home”</em>. Ты включаешь
							любимую дораму, завариваешь рамен — и Сеул уже рядом.
						</p>
						<S.Highlight>
							✨ Почувствуй вкус Кореи, не выходя из дома.
						</S.Highlight>
					</S.TextWrapper>
				</S.AboutContent>
			</Container>
		</S.AboutSection>
	)
}

export default About
