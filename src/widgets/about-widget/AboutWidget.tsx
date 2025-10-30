'use client'

import React from 'react'
import * as S from './styled'
import { motion } from 'framer-motion'
import { FaTelegramPlane } from 'react-icons/fa'

export default function AboutWidget() {
	return (
		<S.Wrapper
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.6 }}
		>
			<S.Header>
				<h1>
					О бренде <span>TARIMI</span>
				</h1>
				<p>
					Мы создаём атмосферу Кореи, чтобы каждый мог почувствовать душу Сеула,
					не выходя из дома. 🌙
				</p>
			</S.Header>

			<S.Section>
				<S.ImageBlock
					as={motion.div}
					initial={{ x: -40, opacity: 0 }}
					whileInView={{ x: 0, opacity: 1 }}
					transition={{ duration: 0.8 }}
				>
					<img src='/images/about/2.png' alt='TARIMI Team' />
				</S.ImageBlock>
				<S.ContentBlock
					as={motion.div}
					initial={{ x: 40, opacity: 0 }}
					whileInView={{ x: 0, opacity: 1 }}
					transition={{ duration: 0.8 }}
				>
					<h2>🩷 Кто мы?</h2>
					<p>
						TARIMI — это команда, вдохновлённая корейской культурой, дорамами и
						уютом. Мы начали с простого желания — передать атмосферу K-дорам:
						теплую еду, эмоции, яркие цвета и немного магии.
					</p>
					<p>
						Наши наборы и товары — не просто еда, это способ ощутить себя частью
						маленькой истории. Мы отбираем только оригинальные продукты и
						собираем их с любовью, чтобы каждая коробка приносила улыбку.
					</p>
				</S.ContentBlock>
			</S.Section>

			<S.Section reverse>
				<S.ImageBlock
					as={motion.div}
					initial={{ x: 40, opacity: 0 }}
					whileInView={{ x: 0, opacity: 1 }}
					transition={{ duration: 0.8 }}
				>
					<img src='/images/about/3.png' alt='TARIMI ramen' />
				</S.ImageBlock>
				<S.ContentBlock
					as={motion.div}
					initial={{ x: -40, opacity: 0 }}
					whileInView={{ x: 0, opacity: 1 }}
					transition={{ duration: 0.8 }}
				>
					<h2>✨ Философия TARIMI</h2>
					<p>
						Мы верим, что еда — это эмоция. Именно поэтому каждое блюдо и каждый
						набор в TARIMI продуман до мелочей: от вкуса до упаковки.
					</p>
					<p>
						Мы хотим, чтобы вы не просто ели рамен, а чувствовали атмосферу
						дорамы — яркую, романтичную, тёплую и искреннюю. Это не магазин —
						это настроение.
					</p>
				</S.ContentBlock>
			</S.Section>

			<S.Mission
				as={motion.section}
				initial={{ opacity: 0 }}
				whileInView={{ opacity: 1 }}
				transition={{ duration: 1 }}
			>
				<h2>🌏 Наша миссия</h2>
				<p>
					Создать бренд, который станет символом уютного вечера с корейским
					настроением. Мы хотим, чтобы TARIMI ассоциировался не только с вкусом,
					но и с эмоцией, теплом и доверием.
				</p>
			</S.Mission>

			<S.Future
				as={motion.section}
				initial={{ opacity: 0, y: 40 }}
				whileInView={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8 }}
			>
				<h2>🚀 Будущее TARIMI</h2>
				<p>
					Совсем скоро — новые коллекции, лимитированные боксы, мерч и много
					коллабораций. Мы растём, и ты можешь быть частью этого пути 💫
				</p>
				<motion.a
					href='https://t.me/tarimi_official'
					target='_blank'
					rel='noreferrer'
					aria-label='Telegram'
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
					onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
				>
					<span>
						<FaTelegramPlane />
					</span>{' '}
					<span>Присоединяйтесь в Телеграм TARIMI</span>
					<span>
						<FaTelegramPlane />
					</span>{' '}
				</motion.a>
			</S.Future>
		</S.Wrapper>
	)
}
