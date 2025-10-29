'use client'

import React from 'react'
import { motion } from 'framer-motion'
import * as S from './styled'
import {
	FaCandyCane,
	FaCoffee,
	FaGift,
	FaTshirt,
	FaGamepad,
	FaStore,
} from 'react-icons/fa'

const upcoming = [
	{
		icon: <FaCandyCane />,
		title: 'Корейские сладости',
		desc: 'Милые, яркие и безумно вкусные — редкие вкусы прямо из Сеула.',
		soon: false,
	},
	{
		icon: <FaCoffee />,
		title: 'Напитки и чай',
		desc: 'От культовых milk-tea до трендовых напитков из дорам.',
		soon: true,
	},
	{
		icon: <FaGift />,
		title: 'Наборы подарков',
		desc: 'Подборки для друзей, пары или уютного вечера дома.',
		soon: false,
	},
	{
		icon: <FaTshirt />,
		title: 'Мерч & аксессуары',
		desc: 'Одежда и детали с корейским вайбом, вдохновлённые K-дорамами.',
		soon: true,
	},
	{
		icon: <FaGamepad />,
		title: 'Фигурки и декор',
		desc: 'Коллекционные фигурки, постеры и предметы для вдохновения.',
		soon: true,
	},
	{
		icon: <FaStore />,
		title: 'POP-UP TARIMI',
		desc: 'Мечтаем о реальном корнере TARIMI в твоём городе 💫',
		soon: true,
	},
]

export default function ComingNext() {
	return (
		<S.Section
			initial={{ opacity: 0 }}
			whileInView={{ opacity: 1 }}
			viewport={{ once: true, margin: '-100px' }}
		>
			<S.Header
				as={motion.h2}
				initial={{ y: 30, opacity: 0 }}
				whileInView={{ y: 0, opacity: 1 }}
				transition={{ duration: 0.6 }}
			>
				Будущее <span>TARIMI</span>
			</S.Header>

			<S.Description
				as={motion.p}
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6, delay: 0.2 }}
			>
				Мы растём и готовим новое. TARIMI становится не просто брендом — а
				способом почувствовать Корею ближе.
			</S.Description>

			<S.Grid>
				{upcoming.map((item, i) => (
					<S.Card
						as={motion.div}
						key={i}
						initial={{ opacity: 0, y: 40 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: i * 0.1 }}
						whileHover={{
							scale: 1.04,
							boxShadow:
								'0 0 30px rgba(255,79,182,0.35), 0 0 60px rgba(0,224,255,0.25)',
						}}
					>
						<S.Icon>{item.icon}</S.Icon>
						<h3>{item.title}</h3>
						<p>{item.desc}</p>
						{item.soon && <S.SoonLabel>Скоро ✦</S.SoonLabel>}
					</S.Card>
				))}
			</S.Grid>

			<S.BackgroundGlow />
		</S.Section>
	)
}
