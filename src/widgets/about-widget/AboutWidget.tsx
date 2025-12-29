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
					TARIMI — точка входа в мир азиатских вкусов. Мы собираем лучшие
					продукты из Кореи, Японии, Таиланда и не только, чтобы вы могли
					создавать свои маленькие атмосферные вечера дома. 🌏
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
						TARIMI — это команда, вдохновлённая азиатской культурой, атмосферой
						улиц и любимыми дорамами. Мы хотим, чтобы каждый набор создавал
						ощущение путешествия по самым вкусным уголкам Азии, не выходя из
						дома.
					</p>
					<p>
						Наши боксы и товары — это не просто еда, а возможность почувствовать
						атмосферу, собрать эмоции, вкус и эстетику в одном месте. Всё
						тщательно отбирается и собирается с любовью, чтобы каждая коробка
						дарила радость.
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
						Мы верим, что еда — это эмоция и атмосфера. Каждая коробка TARIMI
						продумана до мелочей: вкус, упаковка, детали и маленькие сюрпризы
						создают настроение и ощущение настоящего азиатского вечера дома.
					</p>
					<p>
						С нами вы не просто едите рамен или пробуете сладости, вы
						погружаетесь в мир азиатской культуры, уюта и вдохновения.
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
					Создать бренд, который станет символом атмосферного вечера с азиатским
					вайбом. TARIMI — это не только вкус, но и эмоции, вдохновение и уют в
					каждой коробке.
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
					Совсем скоро — новые коллекции, лимитированные боксы, мерч и
					коллаборации со вкусом Азии. Мы растём, и вы можете быть частью этого
					пути 💫
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
					<span>Присоединяйтесь к Telegram TARIMI</span>
					<span>
						<FaTelegramPlane />
					</span>{' '}
				</motion.a>
			</S.Future>
		</S.Wrapper>
	)
}
