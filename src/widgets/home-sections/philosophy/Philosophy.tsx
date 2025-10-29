'use client'

import React from 'react'
import { motion } from 'framer-motion'
import * as S from './styled'
import { FaHeart, FaBoxOpen, FaFilm, FaCookieBite } from 'react-icons/fa'

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
				{features.map((f, i) => (
					<S.Card
						as={motion.div}
						key={i}
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: i * 0.1 }}
						whileHover={{
							scale: 1.04,
							boxShadow:
								'0 0 35px rgba(255,79,182,0.35), 0 0 70px rgba(0,224,255,0.25)',
						}}
					>
						<S.IconWrap>{f.icon}</S.IconWrap>
						<h3>{f.title}</h3>
						<p>{f.text}</p>
					</S.Card>
				))}
			</S.Grid>

			<S.FadeGlow />
		</S.Section>
	)
}
