'use client'
import { useAboutBrand } from '@/shared/services/directus/hooks'
import Container from '@/shared/ui/container/Container'
import { motion } from 'framer-motion'
import 'swiper/css'
import 'swiper/css/effect-fade'
import { Autoplay, EffectFade } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import * as S from './styled'

const About = () => {
	const { data: aboutData, isLoading, isError } = useAboutBrand()

	if (isLoading) {
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
					<div
						style={{
							height: 320,
							borderRadius: 18,
							background:
								'linear-gradient(90deg, rgba(255,255,255,.06) 0%, rgba(255,255,255,.16) 50%, rgba(255,255,255,.06) 100%)',
							backgroundSize: '200% 100%',
							animation: 'tarimi-skeleton 1.2s ease-in-out infinite',
						}}
					/>
					<style jsx global>{`
						@keyframes tarimi-skeleton {
							0% {
								background-position: 200% 0;
							}
							100% {
								background-position: -200% 0;
							}
						}
					`}</style>
				</Container>
			</S.AboutSection>
		)
	}

	// Без статичного fallback, но не оставляем пустую секцию
	if (isError) {
		return (
			<S.AboutSection
				initial={{ opacity: 0 }}
				whileInView={{ opacity: 1 }}
				viewport={{ once: true, margin: '-100px' }}
			>
				<Container>
					<S.AboutTitle as={motion.h2}>
						О бренде <span>TARIMI</span>
					</S.AboutTitle>
					<p style={{ opacity: 0.8 }}>
						Ошибка
					</p>
				</Container>
			</S.AboutSection>
		)
	}

	if (!aboutData) {
		return (
			<S.AboutSection
				initial={{ opacity: 0 }}
				whileInView={{ opacity: 1 }}
				viewport={{ once: true, margin: '-100px' }}
			>
				<Container>
					<S.AboutTitle as={motion.h2}>
						О бренде <span>TARIMI</span>
					</S.AboutTitle>
					<p style={{ opacity: 0.8 }}>
						Нет данных
					</p>
				</Container>
			</S.AboutSection>
		)
	}

	const images = aboutData.images || []
	const heading = aboutData.heading
	const paragraphs = aboutData.paragraphs || []
	const highlight = aboutData.highlight
	const isHtml = (v: string) => /<[^>]+>/.test(v)

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
					{<p dangerouslySetInnerHTML={{ __html: aboutData?.title || 'О бренде' }}></p>} <span>TARIMI</span>
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
							autoplay={{ delay: 4500, disableOnInteraction: false }}
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
						{isHtml(heading) ? (
							<div dangerouslySetInnerHTML={{ __html: heading }} />
						) : (
							<h3>{heading}</h3>
						)}
						{typeof paragraphs === 'string' ? (
							<div dangerouslySetInnerHTML={{ __html: paragraphs }} />
						) : (
							paragraphs.map((p: unknown, i: number) => (
								<p key={i} dangerouslySetInnerHTML={{ __html: String(p) }} />
							))
						)}
						<S.Highlight>
							{highlight}
						</S.Highlight>
					</S.TextWrapper>
				</S.AboutContent>
			</Container>
		</S.AboutSection>
	)
}

export default About
