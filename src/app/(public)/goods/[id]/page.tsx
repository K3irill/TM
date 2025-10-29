'use client'

import React, { useMemo, useState } from 'react'
import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import styled from 'styled-components'
import Link from 'next/link'
import WBIcon from '@/shared/icons/WBIcon'
import OzonIcon from '@/shared/icons/OzonIcon'
import WbButton from '@/shared/ui/WbButton/WbButton'
import OzonBtn from '@/shared/ui/OzonBtn/OzonBtn'

/* ============ MOCK DATA (подружен с твоим листингом) ============ */
type LabelTone = 'hot' | 'new' | 'sale' | 'limited' | 'mild'
type Label = { text: string; tone: LabelTone }
type Product = {
	id: number
	name: string
	slug: string
	price: number
	oldPrice?: number
	images: string[]
	badges?: Label[]
	short: string
	description: string
	specs: Record<string, string>
	ingredients?: string
	shipping?: string
	wbUrl?: string
	ozonUrl?: string
}

const PRODUCTS: Product[] = [
	{
		id: 1,
		slug: 'spicy-box',
		name: 'TARIMI Spicy Box',
		price: 799,
		oldPrice: 999,
		images: ['/images/ramens/spicy.png', '/images/ramens/dorama.png'],
		badges: [{ text: 'Хит', tone: 'hot' }],
		short: 'Острый набор с корейским вайбом 🌶️',
		description:
			'Три порции рамена с разной степенью огня, палочки, соус, кимчи и маленький сюрприз. Идеально под вечер дорамы.',
		specs: {
			Комплектация: '3× рамен, палочки, соус, кимчи, стикер',
			'Страна вкуса': 'Корея',
			'Срок годности': 'см. на упаковке',
			'Вес набора ~': '0.7–0.9 кг',
			'Тип коробки': '220×165×100 мм, микрогофра',
		},
		ingredients:
			'Состав см. на индивидуальной упаковке рамена и снеков. Возможны следы глютена, сои, кунжута.',
		shipping:
			'Доставка по РФ. Самовывоз/СДЭК. Оплата картой. Возврат не скрытой/нераспечатанной еды в течение 7 дней.',
		wbUrl: 'https://www.wildberries.ru/',
		ozonUrl: 'https://www.ozon.ru/',
	},
	{
		id: 2,
		slug: 'dorama-box',
		name: 'TARIMI Dorama Box',
		price: 749,
		images: ['/images/ramens/dorama.png'],
		badges: [{ text: 'Новинка', tone: 'new' }],
		short: 'Мягкий и уютный набор для вечеров под дораму 🏮',
		description:
			'Три любимых вкуса, акцент на мягкую остроту, палочки и приятные мелочи. Seoul-вечер дома — легко и красиво.',
		specs: {
			Комплектация: '3× рамен, палочки, соус, кимчи, стикер',
			'Страна вкуса': 'Корея',
			'Размер коробки': '220×165×100 мм',
		},
		shipping:
			'Доставка по РФ. Самовывоз/СДЭК. Оплата картой. Возврат не скрытой/нераспечатанной еды в течение 7 дней.',
		wbUrl: 'https://www.wildberries.ru/',
	},
	{
		id: 3,
		slug: 'cheesy-box',
		name: 'TARIMI Cheese Box',
		price: 779,
		images: ['/images/ramens/cheesy.png'],
		badges: [{ text: 'Limited', tone: 'limited' }],
		short: 'Сырный набор для нежного, тянучего вайба 🧀',
		description:
			'Нежные сливочно-сырные вкусы, чуть пикантности, палочки и маленькая вкусняшка в подарок.',
		specs: {
			Комплектация: '3× рамен, палочки, соус, стикер',
			'Страна вкуса': 'Корея',
		},
		shipping:
			'Доставка по РФ. Самовывоз/СДЭК. Оплата картой. Возврат не скрытой/нераспечатанной еды в течение 7 дней.',
	},
]

/* ============ PAGE ============ */
export default function ProductPage() {
	const params = useParams() as { id?: string }
	// поддержим как /sets/1 так и /sets/spicy-box
	const product = useMemo(() => {
		const pid = Number(params?.id)
		return PRODUCTS.find(
			p => p.id === pid || p.slug === (params?.id || '').toString()
		)
	}, [params])

	const [activeImg, setActiveImg] = useState(0)
	const [tab, setTab] = useState<'desc' | 'specs' | 'ingr' | 'ship'>('desc')

	if (!product) {
		return (
			<Empty>
				<h2>Товар не найден</h2>
				<Link href='/goods'>← вернуться к товарам</Link>
			</Empty>
		)
	}

	return (
		<Wrap>
			<Breadcrumbs>
				<Link href='/'>Главная</Link> <span>•</span>
				<Link href='/goods'>Товары</Link> <span>•</span>
				<span>{product.name}</span>
			</Breadcrumbs>

			<Grid>
				{/* LEFT: GALLERY */}
				<Left>
					<Sticky>
						<MainImg
							as={motion.div}
							initial={{ opacity: 0, scale: 0.98 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{ duration: 0.4 }}
						>
							<img
								src={product.images[activeImg] ?? product.images[0]}
								alt={product.name}
							/>
						</MainImg>

						{product.images.length > 1 && (
							<Thumbs>
								{product.images.map((src, i) => (
									<button
										key={i}
										aria-label={`img-${i}`}
										data-active={i === activeImg}
										onClick={() => setActiveImg(i)}
									>
										<img src={src} alt={`${product.name} ${i + 1}`} />
									</button>
								))}
							</Thumbs>
						)}
					</Sticky>
				</Left>

				{/* RIGHT: INFO */}
				<Right>
					<TitleRow>
						<h1>{product.name}</h1>
						{product.badges?.map((b, i) => (
							<Badge key={i} data-tone={b.tone}>
								{b.text}
							</Badge>
						))}
					</TitleRow>

					<Short>{product.short}</Short>

					<PriceRow>
						<div className='price'>
							<strong>{product.price} ₽</strong>
							{product.oldPrice && <s>{product.oldPrice} ₽</s>}
						</div>
						<div className='cta'>
							{product.wbUrl && (
								<WbButton
									as='a'
									href={product.wbUrl}
									target='_blank'
									rel='noreferrer'
								>
									Купить на <WBIcon />
								</WbButton>
							)}
							{product.ozonUrl && (
								<OzonBtn
									as='a'
									href={product.ozonUrl}
									target='_blank'
									rel='noreferrer'
								>
									Купить на <OzonIcon />
								</OzonBtn>
							)}
						</div>
					</PriceRow>

					<Divider />

					{/* Tabs */}
					<Tabs>
						<button data-active={tab === 'desc'} onClick={() => setTab('desc')}>
							Описание
						</button>
						<button
							data-active={tab === 'specs'}
							onClick={() => setTab('specs')}
						>
							Характеристики
						</button>
						<button data-active={tab === 'ingr'} onClick={() => setTab('ingr')}>
							Состав
						</button>
						<button data-active={tab === 'ship'} onClick={() => setTab('ship')}>
							Доставка
						</button>
					</Tabs>

					<TabBody>
						{tab === 'desc' && <p>{product.description}</p>}
						{tab === 'specs' && (
							<SpecTable>
								{Object.entries(product.specs).map(([k, v]) => (
									<li key={k}>
										<span>{k}</span>
										<i />
										<b>{v}</b>
									</li>
								))}
							</SpecTable>
						)}
						{tab === 'ingr' && (
							<p>{product.ingredients ?? 'Состав см. на упаковке.'}</p>
						)}
						{tab === 'ship' && (
							<p>
								{product.shipping ?? 'Информация о доставке появится позже.'}
							</p>
						)}
					</TabBody>

					<SmallNote>
						* Фото носит ознакомительный характер. Комплектация может слегка
						отличаться (в рамках концепции набора).
					</SmallNote>
				</Right>
			</Grid>
		</Wrap>
	)
}

/* ============ STYLES ============ */
const Wrap = styled.main`
	min-height: 100dvh;
	max-width: 1200px;
	margin: 0 auto;
	padding: 8rem 16px 56px;
	color: #fff;
`

const Breadcrumbs = styled.nav`
	font-size: 0.9rem;
	color: rgba(255, 255, 255, 0.6);
	display: flex;
	gap: 0.5rem;
	a {
		color: rgba(255, 255, 255, 0.75);
		text-decoration: none;
		transition: color 0.3s;

		&:hover {
			color: white;
		}
	}
	margin-bottom: 16px;
`

const Grid = styled.section`
	display: grid;
	grid-template-columns: 6fr 6fr;
	gap: 28px;

	@media (max-width: 960px) {
		grid-template-columns: 1fr;
	}
`

const Left = styled.div``
const Sticky = styled.div`
	position: sticky;
	top: 86px;
	display: grid;
	gap: 12px;
`

const MainImg = styled(motion.div)`
	background: rgba(255, 255, 255, 0.04);
	border: 1px solid rgba(255, 255, 255, 0.08);
	border-radius: 16px;
	padding: 16px;
	backdrop-filter: blur(8px);
	box-shadow: 0 0 24px rgba(255, 79, 182, 0.12);

	img {
		width: 100%;
		height: auto;
		display: block;
		object-fit: contain;
	}
`

const Thumbs = styled.div`
	display: flex;

	gap: 10px;
	overflow-x: auto;
	padding-bottom: 4px;

	button {
		background: rgba(255, 255, 255, 0.05);
		width: fit-content;
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 10px;
		padding: 6px;
		cursor: pointer;
		transition: transform 0.2s ease, border-color 0.2s ease;
	}
	button[data-active='true'] {
		border-color: #00e0ff;
	}
	img {
		width: 76px;
		height: 76px;
		object-fit: contain;
		display: block;
	}
`

const Right = styled.div``

const TitleRow = styled.header`
	display: flex;
	flex-wrap: wrap;
	gap: 10px 14px;
	align-items: center;
	margin-bottom: 8px;

	h1 {
		margin: 0;
		font-size: clamp(1.6rem, 4vw, 2.2rem);
		font-family: 'Geologica';
		background: linear-gradient(90deg, #ff4fb6, #00e0ff);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
	}
`

const Badge = styled.span`
	font-size: 0.75rem;
	padding: 0.25rem 0.55rem;
	border-radius: 999px;
	border: 1px solid rgba(255, 255, 255, 0.18);
	background: rgba(255, 255, 255, 0.06);
	letter-spacing: 0.3px;

	&[data-tone='hot'] {
		border-color: #ff4fb6;
		color: #ffbde5;
	}
	&[data-tone='new'] {
		border-color: #00e0ff;
		color: #c9f7ff;
	}
	&[data-tone='limited'] {
		border-color: #ffd166;
		color: #ffe9b0;
	}
	&[data-tone='sale'] {
		border-color: #9aff8a;
		color: #d8ffd3;
	}
`

const Short = styled.p`
	color: rgba(255, 255, 255, 0.78);
	margin: 6px 0 16px;
`

const PriceRow = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	gap: 14px;
	flex-wrap: wrap;
	margin-bottom: 14px;

	.price {
		display: flex;
		align-items: center;
		gap: 10px;
		strong {
			font-size: 1.8rem;
		}
		s {
			color: rgba(255, 255, 255, 0.5);
		}
	}
	.cta {
		display: flex;
		gap: 8px;
		flex-wrap: wrap;
		a,
		button {
			white-space: nowrap;
		}
	}
`

const Divider = styled.div`
	height: 1px;
	background: linear-gradient(90deg, #ff4fb6, #00e0ff);
	opacity: 0.35;
	margin: 14px 0 12px;
`

const Tabs = styled.div`
	display: flex;
	gap: 8px;
	flex-wrap: wrap;
	margin-bottom: 8px;
	button {
		border: 1px solid rgba(255, 255, 255, 0.14);
		background: rgba(255, 255, 255, 0.06);
		color: #fff;
		border-radius: 10px;
		padding: 0.5rem 0.8rem;
		cursor: pointer;
		transition: all 0.2s ease;
	}
	button[data-active='true'] {
		border-color: #00e0ff;
		box-shadow: 0 0 16px rgba(0, 224, 255, 0.25);
	}
`

const TabBody = styled.div`
	color: rgba(255, 255, 255, 0.8);
	line-height: 1.7;
	p {
		margin: 0;
	}
`

const SpecTable = styled.ul`
	list-style: none;
	margin: 0;
	padding: 0;
	display: grid;
	gap: 8px;
	li {
		display: grid;
		grid-template-columns: 180px 1fr;
		gap: 10px;
		align-items: center;
		background: rgba(255, 255, 255, 0.04);
		border-radius: 10px;
		padding: 0.6rem 0.8rem;
		@media (max-width: 520px) {
			grid-template-columns: 1fr;
		}
	}
	span {
		color: rgba(255, 255, 255, 0.6);
	}
	i {
		display: block;
		height: 1px;
		background: rgba(255, 255, 255, 0.06);
		opacity: 0.6;
	}
	b {
		font-weight: 600;
	}
`

const SmallNote = styled.p`
	margin-top: 12px;
	font-size: 0.85rem;
	color: rgba(255, 255, 255, 0.55);
	backdrop-filter: blur(2px);
`

const Empty = styled.div`
	max-width: 900px;
	margin: 0 auto;
	padding: 60px 16px;
	text-align: center;
	color: #fff;
	a {
		color: #00e0ff;
		text-decoration: none;
	}
`
