'use client'
import React, { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import * as S from './styled'
import { PRODUCTS } from './content'
import { Category, TSort, Product } from './model/types'

export default function GoodsWidget() {
	const query = window.location.search && window.location.search.slice(1)
	const [filter, setFilter] = useState<Category | 'all'>(
		(query as Category) || 'all'
	)
	const [sort, setSort] = useState<TSort>('newest')
	const [page, setPage] = useState(1)
	const perPage = 8

	useEffect(() => {
		setFilter(window.location.search.slice(1) as Category)
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

								if (typeof window !== 'undefined') {
									const url = new URL(window.location.href)
									url.search = ''

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

									<h3>{p.name}</h3>
									<p>{p.desc}</p>

									<S.PriceRow>
										<div className='left'>
											<strong>{p.price} ₽</strong>
											{p.oldPrice && <s>{p.oldPrice} ₽</s>}
										</div>
										{pct ? <S.SaveTag>-{pct}%</S.SaveTag> : null}
									</S.PriceRow>

									<S.BtnRow>
										<Link
											href={isDim ? '#' : `/goods/${p.slug ?? p.id}`}
											aria-disabled={isDim}
											onClick={e => {
												if (isDim) e.preventDefault()
											}}
										>
											<motion.button
												whileTap={{ scale: isDim ? 1.0 : 0.95 }}
												disabled={isDim}
											>
												{p.outOfStock
													? 'Сообщить о наличии'
													: p.comingSoon
													? 'Скоро'
													: 'Подробнее'}
											</motion.button>
										</Link>
									</S.BtnRow>
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
