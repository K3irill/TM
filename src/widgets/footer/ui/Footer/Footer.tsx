'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import * as S from './styled'
import {
	FaTelegramPlane,
	FaInstagram,
	FaTiktok,
	FaYoutube,
	FaEnvelope,
	FaMapMarkerAlt,
	FaClock,
} from 'react-icons/fa'
import LogoIcon from '@/shared/ui/logo/LogoIcon'
import WBIcon from '@/shared/icons/WBIcon'
import WbButton from '@/shared/ui/WbButton/WbButton'
import WbOzon from '@/shared/ui/OzonBtn/OzonBtn'
import OzonIcon from '@/shared/icons/OzonIcon'
import OzonBtn from '@/shared/ui/OzonBtn/OzonBtn'

export default function Footer() {
	return (
		<S.FooterWrapper
			as={motion.div}
			initial={{ background: '#5c036143' }}
			whileInView={{ background: 'rgba(10, 10, 15, 0.9)' }}
			transition={{ duration: 1 }}
		>
			<S.TopGlow aria-hidden />

			<S.Grid>
				<S.Col>
					<S.BrandRow>
						<Link href='/'>
							<S.Logo>
								<LogoIcon /> <span>TARIMI</span>
							</S.Logo>
						</Link>
						<p>Корейский вайб — это про нас!🍜</p>
					</S.BrandRow>
					<S.Text>
						<p>
							Мы вдохновляемся культурой Кореи и Азии в целом, переносим её в
							твой дом: от любимых вкусов до уютных деталей.
						</p>
						<p>
							Рамены, снеки, напитки и многое другое — всё, чтобы почувствовать
							тот самый Seoul-вайб.
						</p>
					</S.Text>

					<S.Socials aria-label='Наши соцсети'>
						<motion.a
							href='https://t.me/tarimi_official'
							target='_blank'
							rel='noreferrer'
							aria-label='Telegram'
							animate={{
								scale: [1, 1.03, 1],
							}}
							transition={{
								duration: 4,
								repeat: Infinity,
								ease: 'easeInOut',
							}}
						>
							Телеграм блог: <FaTelegramPlane />
						</motion.a>
						{/* <a
							href='https://www.instagram.com/tarimi.official/'
							target='_blank'
							rel='noreferrer'
							aria-label='Instagram'
						>
							<FaInstagram />
						</a>
						<a
							href='https://www.tiktok.com/@tarimi.official'
							target='_blank'
							rel='noreferrer'
							aria-label='TikTok'
						>
							<FaTiktok />
						</a>
						<a
							href='https://youtube.com/@tarimi.official?si=GHULU2lx7nP73v5z'
							target='_blank'
							rel='noreferrer'
							aria-label='YouTube'
						>
							<FaYoutube />
						</a> */}
					</S.Socials>
				</S.Col>

				{/* Shop */}
				<S.Col>
					<S.ColTitle>Магазин</S.ColTitle>
					<S.LinkList>
						<li>
							<Link href='/goods'>Все товары</Link>
						</li>
						<li>
							<Link href='/goods?sets'>Наборы</Link>
						</li>

						<li>
							<S.DisabledLink soon>Рамен</S.DisabledLink>
						</li>
						<li>
							<S.DisabledLink soon>Снеки</S.DisabledLink>
						</li>
						<li>
							<S.DisabledLink soon>Сладости</S.DisabledLink>
						</li>
						<li>
							<S.DisabledLink soon>Фигурки</S.DisabledLink>
						</li>
						{/* <li>
							<S.DisabledLink soon>Мерч</S.DisabledLink>
						</li>
						<li>
							<S.DisabledLink soon>Подписка</S.DisabledLink>
						</li> */}
					</S.LinkList>
				</S.Col>

				{/* Help */}
				<S.Col>
					<S.ColTitle>Помощь</S.ColTitle>
					<S.LinkList>
						{/* <li>
							<Link href='/faq'>FAQ</Link>
						</li> */}
						<li>
							<Link href='https://t.me/tarimiFounder'>Связаться с нами</Link>
						</li>
					</S.LinkList>
				</S.Col>

				{/* Contacts */}
				<S.Col>
					<S.ColTitle>Контакты</S.ColTitle>
					<S.ContactList>
						{/* <li>
							<FaPhoneAlt />
							<a href='tel:+70000000000'>+7 (000) 000-00-00</a>
						</li> */}
						<li>
							<FaEnvelope />
							<a href='mailto:hello@tarimi.store'>hello.tarimi@gmail.com</a>
						</li>
						<li>
							<FaMapMarkerAlt />
							<span>Краснодар</span>
						</li>
						<li>
							<FaClock />
							<span>Пн-Вс: 10:00–21:00</span>
						</li>
					</S.ContactList>
					<S.StoreBtns>
						<WbButton
							as={motion.a}
							href='https://www.wildberries.ru/brands/312270944-tarimi'
							target='_blank'
							rel='noreferrer'
							title='Наш магазин на Wildberries'
							whileHover={{ scale: 1.18, rotate: 1 }}
							whileTap={{ scale: 0.96 }}
							animate={{
								scale: [1, 1.03, 1],
							}}
							transition={{
								duration: 4,
								repeat: Infinity,
								ease: 'easeInOut',
							}}
						>
							<WBIcon />
							<span>Мы на Wildberries</span>
						</WbButton>
						{/* <OzonBtn
							as={motion.a}
							href='https://www.ozon.ru/'
							target='_blank'
							rel='noreferrer'
							title='Наш магазин на Ozon'
							whileHover={{ scale: 1.18, rotate: 1 }}
							whileTap={{ scale: 0.96 }}
							animate={{
								scale: [1, 1.03, 1],
							}}
							transition={{
								duration: 4,
								repeat: Infinity,
								ease: 'easeInOut',
							}}
						>
							<OzonIcon />
							<span>Мы на Ozon</span>
						</OzonBtn> */}
					</S.StoreBtns>
				</S.Col>

				{/* Newsletter */}
				<S.ColWide hidden>
					<S.ColTitle>−10% на первый заказ</S.ColTitle>
					<S.Text>Подпишись на рассылку с рецептами и новинками.</S.Text>
					<S.Form
						onSubmit={e => {
							e.preventDefault()
						}}
						role='form'
						aria-label='Подписка на новости'
					>
						<input
							type='email'
							placeholder='Email'
							aria-label='Email'
							required
						/>
						<motion.button
							whileHover={{ scale: 1.03 }}
							whileTap={{ scale: 0.97 }}
							type='submit'
						>
							Подписаться
						</motion.button>
					</S.Form>
				</S.ColWide>
			</S.Grid>

			<S.Bottom>
				<div className='line' />
				<p>© {new Date().getFullYear()} TARIMI. Все права защищены.</p>
			</S.Bottom>
		</S.FooterWrapper>
	)
}
