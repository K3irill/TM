'use client'
import { useProducts } from '@/shared/services/directus/hooks'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import { Category, Product, TSort } from './model/types'
import * as S from './styled'

const formatPrice = (value: number) =>
	new Intl.NumberFormat('ru-RU', {
		style: 'currency',
		currency: 'RUB',
		maximumFractionDigits: 0,
	}).format(value)

export default function GoodsWidget() {
	const router = useRouter()
	const [filter, setFilter] = useState<Category | 'all'>('all')
	const [sort, setSort] = useState<TSort>('newest')
	const [page, setPage] = useState(1)
	const [isClient, setIsClient] = useState(false)
	const perPage = 8

	// Получаем товары из Directus
	const { data: directusProducts = [], isLoading: isLoadingDirectus } = useProducts({
		category: filter !== 'all' ? filter : undefined,
		sort: sort === 'price' ? ['price'] : ['-dateAdded'],
	})

	useEffect(() => {
		setIsClient(true)

		// Получаем query только на клиенте
		if (typeof window !== 'undefined') {
			const query = window.location.search && window.location.search.slice(1)
			if (query) {
				setFilter(query as Category)
			}
		}
	}, [])

	const sortedAndFiltered = useMemo(() => {
		// Только Directus данные (без статичного fallback)
		const productsList = directusProducts

		// 1) фильтруем
		let list =
			filter === 'all' ? productsList : productsList.filter(p => p.category === filter)

		// 2) сортируем
		if (sort === 'price') {
			list = [...list].sort((a, b) => a.price - b.price)
		} else {
			// newest: по убыванию даты добавления
			list = [...list].sort((a, b) => {
				const da = new Date(a.dateAdded).getTime()
				const db = new Date(b.dateAdded).getTime()
				if (db !== da) return db - da
				// стабильный доп. порядок: сначала «в продаже», затем «скоро», затем «нет»
				const rank = (p: Product) => (p.outOfStock ? 2 : p.comingSoon ? 1 : 0)
				const r = rank(a) - rank(b)
				if (r !== 0) return r
				return a.price - b.price
			})
		}

		return list
	}, [filter, sort, directusProducts])

	const totalPages = Math.max(1, Math.ceil(sortedAndFiltered.length / perPage))

	useEffect(() => {
		if (page > totalPages) setPage(1)
	}, [totalPages, page])

	// 3) пагинация
	const paginated = useMemo(() => {
		const start = (page - 1) * perPage
		return sortedAndFiltered.slice(start, start + perPage)
	}, [sortedAndFiltered, page])

	const topLabel = (p: Product) => {
		if (p.comingSoon) return { text: 'Скоро', tone: 'mild' as const }
		if (p.outOfStock) return { text: 'Нет в наличии', tone: 'empty' as const }
		if (p.hot) return { text: 'Хит', tone: 'hot' as const }
		if (p.new) return { text: 'Новинка', tone: 'new' as const }
		if (p.limited) return { text: 'Ограничено', tone: 'limited' as const }
		if (p.salePercent)
			return { text: `-${p.salePercent}%`, tone: 'sale' as const }
		return null
	}

	const discountPercent = (p: Product) =>
		p.oldPrice && p.oldPrice > p.price
			? Math.round(((p.oldPrice - p.price) / p.oldPrice) * 100)
			: p.salePercent

	// Показываем заглушку на сервере
	if (!isClient) {
		return (
			<S.Wrap>
				<S.Header>
					<h1>
						<span>🛍️</span> Товары <span>TARIMI</span>
					</h1>
					<p>Загрузка товаров...</p>
				</S.Header>
			</S.Wrap>
		)
	}

	// Лоадер, пока тянем данные из Directus (без показа статичных товаров)
	if (isLoadingDirectus) {
		return (
			<S.Wrap>
				<S.Header>
					<h1>
						<span>🛍️</span> Товары <span>TARIMI</span>
					</h1>
					<p>Загружаем каталог...</p>
				</S.Header>

				<S.Grid>
					{Array.from({ length: 8 }).map((_, idx) => (
						<S.Card key={`skeleton-${idx}`} style={{ pointerEvents: 'none' }}>
							<S.Glow />
							<S.ImgWrap>
								<div
									style={{
										width: '100%',
										height: 220,
										borderRadius: 18,
										background:
											'linear-gradient(90deg, rgba(255,255,255,.08) 0%, rgba(255,255,255,.18) 50%, rgba(255,255,255,.08) 100%)',
										backgroundSize: '200% 100%',
										animation: 'tarimi-skeleton 1.2s ease-in-out infinite',
									}}
								/>
							</S.ImgWrap>
							<S.Content>
								<S.PriceRow>
									<div className='left'>
										<div
											style={{
												height: 18,
												width: 120,
												borderRadius: 10,
												background:
													'linear-gradient(90deg, rgba(255,255,255,.08) 0%, rgba(255,255,255,.18) 50%, rgba(255,255,255,.08) 100%)',
												backgroundSize: '200% 100%',
												animation: 'tarimi-skeleton 1.2s ease-in-out infinite',
											}}
										/>
									</div>
								</S.PriceRow>
								<div
									style={{
										height: 16,
										width: '70%',
										borderRadius: 10,
										margin: '10px 0',
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
							</S.Content>
						</S.Card>
					))}
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
			</S.Wrap>
		)
	}

	return (
		<S.Wrap
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.5 }}
		>
			<S.Header>
				<h1>
					<span>🛍️</span> Товары <span>TARIMI</span>
				</h1>
				<p>
					Всё, что создаёт корейское настроение — наборы, снеки, фигурки и
					больше.
				</p>
			</S.Header>

			<S.Filters>
				<div className='cats'>
					{(
						[
							'all',
							'sets',
							'ramen',
							'sweets',
							'snacks',
							'drinks',
							'clothes',
							'sweet-sets',
							'figures',
						] as const
					).map(c => (
						<button
							key={c}
							data-active={filter === c}
							onClick={() => {
								setFilter(c as Category | 'all')
								setPage(1)

								// Обновляем URL только на клиенте
								if (typeof window !== 'undefined') {
									const url = new URL(window.location.href)
									if (c === 'all') {
										url.search = ''
									} else {
										url.search = c
									}
									history.replaceState(null, '', url.toString())
								}
							}}
						>
							{c === 'all'
								? 'Все'
								: c === 'sets'
								? 'Наборы'
								: c === 'sweet-sets'
								? 'Сладкие Наборы'
								: c === 'ramen'
								? 'Рамен'
								: c === 'sweets'
								? 'Сладости'
								: c === 'snacks'
								? 'Снеки'
								: c === 'clothes'
								? 'Одежда'
								: c === 'drinks'
								? 'Напитки'
								: 'Фигурки'}
						</button>
					))}
				</div>
				<S.SelectWrap>
					<select
						value={sort}
						onChange={e => {
							setSort(e.target.value as TSort)
							setPage(1)
						}}
					>
						<option value='newest'>Новинки</option>
						<option value='price'>Дешевле</option>
					</select>
				</S.SelectWrap>
			</S.Filters>

			<S.Grid>
				{paginated.length > 0
					? paginated.map(p => {
							const label = topLabel(p)
							const pct = discountPercent(p)
							const isDim = p.comingSoon || p.outOfStock

							return (
								<S.Card
									onClick={() => router.push(`/goods/${p.slug ?? p.id}`)}
									key={p.id}
									whileHover={{ scale: isDim ? 1.0 : 1.02 }}
									data-state={
										p.comingSoon ? 'soon' : p.outOfStock ? 'oos' : 'ok'
									}
								>
									<S.Glow />

									<S.ImgWrap>
										<img src={p.img} alt={p.name} />
										{label && (
											<S.Ribbon data-tone={label.tone}>{label.text}</S.Ribbon>
										)}
										{isDim && (
											<S.DimBadge data-variant={p.outOfStock ? 'oos' : 'soon'}>
												{p.outOfStock ? 'НЕТ В НАЛИЧИИ' : 'СКОРО'}
											</S.DimBadge>
										)}
									</S.ImgWrap>
									<S.Content>
										<S.PriceRow>
											<div className='left'>
												<strong>{formatPrice(p.price)}</strong>
												{p.oldPrice && <s>{formatPrice(p.oldPrice)}</s>}
											</div>
											{pct ? <S.SaveTag>-{pct}%</S.SaveTag> : null}
										</S.PriceRow>
										<h3>{p.name}</h3>
										<p>{p.desc}</p>

										<S.BtnRow>
											<Link
												href={`/goods/${p.slug ?? p.id}`}
												onClick={e => {
													if (isDim) e.preventDefault()
												}}
											>
												<motion.button whileTap={{ scale: isDim ? 1.0 : 0.95 }}>
													{p.outOfStock
														? 'Сообщить о наличии'
														: p.comingSoon
														? 'Скоро'
														: 'Подробнее'}
												</motion.button>
											</Link>
										</S.BtnRow>
									</S.Content>
								</S.Card>
							)
					  })
					: 'В данной категории Товаров нет'}
			</S.Grid>
			{paginated.length > 0 && (
				<S.Pagination>
					{Array.from({ length: totalPages }).map((_, i) => (
						<button
							key={i}
							data-active={i + 1 === page}
							onClick={() => setPage(i + 1)}
						>
							{i + 1}
						</button>
					))}
				</S.Pagination>
			)}
		</S.Wrap>
	)
}
