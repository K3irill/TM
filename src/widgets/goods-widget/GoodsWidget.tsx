'use client'
import React, { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import * as S from './styled'
import { PRODUCTS } from './content'
import { Category, TSort, Product } from './model/types'

export default function GoodsWidget() {
	const [filter, setFilter] = useState<Category | 'all'>('all')
	const [sort, setSort] = useState<TSort>('newest')
	const [page, setPage] = useState(1)
	const [isClient, setIsClient] = useState(false)
	const perPage = 8

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
		// 1) фильтруем
		let list =
			filter === 'all' ? PRODUCTS : PRODUCTS.filter(p => p.category === filter)

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
	}, [filter, sort])

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
					{(['all', 'sets', 'ramen', 'snacks', 'figures'] as const).map(c => (
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
								: c === 'ramen'
								? 'Рамен'
								: c === 'snacks'
								? 'Снеки'
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
												<strong>{p.price} ₽</strong>
												{p.oldPrice && <s>{p.oldPrice} ₽</s>}
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
