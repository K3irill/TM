'use client'

import type { WhyUsItem } from '@/shared/services/directus/client'
import { useWhyUs } from '@/shared/services/directus/hooks'
import { motion } from 'framer-motion'
import React from 'react'
import { FaBoxOpen, FaCookieBite, FaFilm, FaHeart } from 'react-icons/fa'
import * as S from './styled'

type IconKey = 'heart' | 'film' | 'cookie' | 'box'

const iconByKey: Record<IconKey, React.ReactNode> = {
	heart: <FaHeart />,
	film: <FaFilm />,
	cookie: <FaCookieBite />,
	box: <FaBoxOpen />,
}

const iconOrder: IconKey[] = ['heart', 'film', 'cookie', 'box']

// Статические данные для fallback (оставлены по запросу пользователя, но не используются в UI)
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const features = [
	{
		icon: <FaHeart />,
		title: 'Создаём с душой',
		text: 'Каждый продукт TARIMI — это частичка атмосферы Кореи, где важна не только еда, но и эмоции.',
	},
	{
		icon: <FaFilm />,
		title: 'Вдохновлены дорамами',
		text: 'Мы переносим эстетику любимых сцен и уют Сеула в каждый элемент бренда — от упаковки до вкуса.',
	},
	{
		icon: <FaCookieBite />,
		title: 'Настоящие вкусы Кореи',
		text: 'Собираем редкие снеки, напитки и новинки прямо из Кореи. То, что в тренде — уже у тебя дома.',
	},
	{
		icon: <FaBoxOpen />,
		title: 'Не только наборы',
		text: 'TARIMI растёт: готовим к запуску сладости, мерч, фигурки и многое другое — всё с корейским вайбом.',
	},
]

export default function Philosophy() {
	const { data: items = [], isLoading, isError } = useWhyUs() as unknown as {
		data?: WhyUsItem[]
		isLoading: boolean
		isError: boolean
	}

	return (
		<S.Section
			initial={{ opacity: 0 }}
			whileInView={{ opacity: 1 }}
			viewport={{ once: true, margin: '-100px' }}
		>
			<S.Header
				initial={{ y: 30, opacity: 0 }}
				whileInView={{ y: 0, opacity: 1 }}
				transition={{ duration: 0.6 }}
			>
				Почему <span>TARIMI</span>?
			</S.Header>

			<S.Grid>
				{isLoading
					? Array.from({ length: 4 }).map((_, i) => (
							<S.Card
								as={motion.div}
								key={`skeleton-${i}`}
								style={{ pointerEvents: 'none' }}
								initial={{ opacity: 0, y: 30 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.6, delay: i * 0.08 }}
							>
								<S.IconWrap style={{ opacity: 0.4 }} />
								<div
									style={{
										height: 16,
										width: '70%',
										borderRadius: 10,
										margin: '0.8rem auto 0.6rem',
										background:
											'linear-gradient(90deg, rgba(255,255,255,.08) 0%, rgba(255,255,255,.18) 50%, rgba(255,255,255,.08) 100%)',
										backgroundSize: '200% 100%',
										animation: 'tarimi-skeleton 1.2s ease-in-out infinite',
									}}
								/>
								<div
									style={{
										height: 12,
										width: '95%',
										borderRadius: 10,
										margin: '0 auto',
										background:
											'linear-gradient(90deg, rgba(255,255,255,.08) 0%, rgba(255,255,255,.18) 50%, rgba(255,255,255,.08) 100%)',
										backgroundSize: '200% 100%',
										animation: 'tarimi-skeleton 1.2s ease-in-out infinite',
									}}
								/>
							</S.Card>
					  ))
					: isError
					? 'Ошибка загрузки'
					: items.length > 0
					? items.map((f: WhyUsItem, i: number) => (
							<S.Card
								as={motion.div}
								key={f.id ?? i}
								initial={{ opacity: 0, y: 30 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.6, delay: i * 0.1 }}
								whileHover={{
									scale: 1.04,
									boxShadow:
										'0 0 35px rgba(255,79,182,0.35), 0 0 70px rgba(0,224,255,0.25)',
								}}
							>
								<S.IconWrap>
									{iconByKey[(f.icon as IconKey) || iconOrder[i % iconOrder.length]] ??
										<FaHeart />}
								</S.IconWrap>
								<h3>{f.title}</h3>
								<p>{f.text ?? f.desc}</p>
							</S.Card>
					  ))
					: 'Нет данных'}
			</S.Grid>

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

			<S.FadeGlow />
		</S.Section>
	)
}
