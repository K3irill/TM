'use client'

import WBIcon from '@/shared/icons/WBIcon'
import { useRamenSets } from '@/shared/services/directus/hooks'
import WbButton from '@/shared/ui/WbButton/WbButton'
import { motion } from 'framer-motion'
import Link from 'next/link'
import * as S from './styled'

type LabelTone = 'hot' | 'new' | 'sale' | 'limited' | 'mild'
type Label = { text: string; tone: LabelTone }

// Статичные наборы — оставляем в коде на будущее, но НЕ используем в UI
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const staticSets = [
	{
		id: 1,
		name: 'Dorama miniBox',
		link: '/goods/dorama-minibox-1',
		img: '/images/ramens/dorama-mini-1/dorama-mini-1-1.png',
		desc: 'Три любимых вкуса с мягкой остротой, палочки, соус, нори и сладости. 💞',
		wbUrl: 'https://www.wildberries.ru/catalog/725849598/detail.aspx',
	},
	{
		id: 2,
		name: 'Dorama Box',
		link: '/goods/dorama-box',
		img: '/images/ramens/dorama/1.png',
		desc: 'Шесть порций рамена с разной степенью остроты, палочки, соус, нори и сладости. Идеальный уютный вечер с корейским вайбом. 🌸',
		top_label: [{ text: 'Хит', tone: 'hot' }],
		labels: null as null | Label[],
		wbUrl: 'https://www.wildberries.ru/catalog/723557056/detail.aspx',
	},
	{
		id: 3,
		name: 'Spicy Box',
		link: '/goods/spicy-box',
		img: '/images/ramens/spicy/spicy-full-1.png',
		desc: 'Шесть порций острого рамена, палочки, соус, нори и сладости. Острые ощущения и драйв для настоящих любителей азиатской кухни. 🔥',
		top_label: [],
		labels: null as null | Label[],
		wbUrl: 'https://www.wildberries.ru/catalog/725788297/detail.aspx',
	},
]

export default function RamenSets() {
	const { data: sets = [], isLoading } = useRamenSets()

	return (
		<S.Section
			initial={{ opacity: 0 }}
			whileInView={{ opacity: 1 }}
			viewport={{ once: true, margin: '-100px' }}
		>
			<S.Header
				as={motion.h2}
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6 }}
			>
				<div>
					<span>🍜</span> Наборы <span>TARIMI</span>
				</div>
				<div>
					<p>
						Собираем уникальные наборы с Азиатским вайбом. Набор состоит из
						рамена и тщательно подобранных допов
					</p>
				</div>
			</S.Header>

			<S.Grid
				as={motion.div}
				initial={{ scale: 0.9, opacity: 0 }}
				whileInView={{ opacity: 1, scale: 1 }}
				transition={{ duration: 0.6 }}
			>
				{isLoading
					? Array.from({ length: 3 }).map((_, idx) => (
							<S.Card
								key={`skeleton-${idx}`}
								style={{ pointerEvents: 'none' }}
								transition={{ type: 'spring', stiffness: 220, damping: 18 }}
							>
								<S.GlowBorder aria-hidden />
								<div
									style={{
										height: 220,
										borderRadius: 18,
										background:
											'linear-gradient(90deg, rgba(255,255,255,.08) 0%, rgba(255,255,255,.18) 50%, rgba(255,255,255,.08) 100%)',
										backgroundSize: '200% 100%',
										animation: 'tarimi-skeleton 1.2s ease-in-out infinite',
									}}
								/>
								<div style={{ padding: '14px 6px 6px' }}>
									<div
										style={{
											height: 16,
											width: '70%',
											borderRadius: 10,
											marginBottom: 10,
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
											background:
												'linear-gradient(90deg, rgba(255,255,255,.08) 0%, rgba(255,255,255,.18) 50%, rgba(255,255,255,.08) 100%)',
											backgroundSize: '200% 100%',
											animation: 'tarimi-skeleton 1.2s ease-in-out infinite',
										}}
									/>
								</div>
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
							</S.Card>
					  ))
					: sets.map(set => {
					return (
						<S.Card
							data-tone={set.top_label?.[0]?.tone}
							key={set.id}
							whileHover={{ scale: 1.02 }}
							transition={{ type: 'spring', stiffness: 220, damping: 18 }}
						>
							<S.GlowBorder aria-hidden />

							{set.top_label?.[0] && (
								<S.Ribbon data-tone={set.top_label[0].tone}>
									{set.top_label[0].text}
								</S.Ribbon>
							)}

							<S.ImageWrap
								as={motion.div}
								style={{
									transformStyle: 'preserve-3d',
								}}
							>
								<motion.img
									src={set.img}
									alt={set.name}
									initial={{ scale: 1.03, opacity: 0 }}
									whileInView={{ scale: 1, opacity: 1 }}
									whileHover={{ scale: 1.02 }}
									transition={{ duration: 0.6 }}
								/>
							</S.ImageWrap>

							{set.labels?.length ? (
								<S.LabelRow>
									{set.labels.map((l, i) => (
										<S.LabelChip
											key={i}
											$discount={l.text.match(/\d+/) as unknown as number}
											data-tone={l.tone}
										>
											{l.text}
										</S.LabelChip>
									))}
								</S.LabelRow>
							) : null}

							<h3>{set.name}</h3>
							<p>{set.desc}</p>

							<S.BtnRow>
								<S.BtnRowTop>
									<a href={set.wbUrl} target='_blank' rel='nofollow'>
										<WbButton>
											Купить на <WBIcon />
										</WbButton>
									</a>
									<Link href={`${set.link}`}>
										<motion.button
											whileHover={{
												scale: 1.04,
												boxShadow: '0 0 16px rgba(255,79,182,.6)',
											}}
											whileTap={{ scale: 0.96 }}
										>
											Подробнее
										</motion.button>
									</Link>
									{/* <OzonBtn>
										Купить на <OzonIcon />
									</OzonBtn> */}
								</S.BtnRowTop>
								{/* <Link href={`${set.link}`}>
									<motion.button
										whileHover={{
											scale: 1.04,
											boxShadow: '0 0 16px rgba(255,79,182,.6)',
										}}
										whileTap={{ scale: 0.96 }}
									>
										Подробнее
									</motion.button>
								</Link> */}
							</S.BtnRow>
						</S.Card>
					)
				})}
			</S.Grid>

			<S.BottomLink
				as={motion.div}
				initial={{ opacity: 0 }}
				whileInView={{ opacity: 1 }}
				transition={{ duration: 0.6 }}
			>
				<Link href='/goods'>
					<motion.button
						whileHover={{
							scale: 1.05,
							boxShadow: '0 0 22px rgba(0,224,255,.55)',
						}}
						whileTap={{ scale: 0.95 }}
					>
						Посмотреть все наборы →
					</motion.button>
				</Link>
			</S.BottomLink>
		</S.Section>
	)
}
