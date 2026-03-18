'use client'

import OzonIcon from '@/shared/icons/OzonIcon'
import WBIcon from '@/shared/icons/WBIcon'
import { useProduct } from '@/shared/services/directus/hooks'
import OzonBtn from '@/shared/ui/OzonBtn/OzonBtn'
import WbButton from '@/shared/ui/WbButton/WbButton'
import { mapProductToDetailsVm } from '@/entities/product/lib/mapProductToDetailsVm'
import Link from 'next/link'
import { useMemo, useState } from 'react'
import type { Swiper as SwiperType } from 'swiper'
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/navigation'
import 'swiper/css/thumbs'
import { FreeMode, Navigation, Thumbs } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import * as S from './styled'

type Props = {
	slugOrId: string
}

export default function ProductDetailsWidget({ slugOrId }: Props) {
	const { data: directusProduct, isLoading, isError } = useProduct(slugOrId)

	const product = useMemo(() => mapProductToDetailsVm(directusProduct), [directusProduct])

	const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null)
	const [tab, setTab] = useState<'desc' | 'specs' | 'ingr' | 'ship'>('desc')

	if (isLoading) {
		return (
			<S.Empty>
				<h2>Загрузка товара…</h2>
				<Link href='/goods'>← вернуться к товарам</Link>
			</S.Empty>
		)
	}

	if (isError) {
		return (
			<S.Empty>
				<h2>Ошибка загрузки</h2>
				<Link href='/goods'>← вернуться к товарам</Link>
			</S.Empty>
		)
	}

	if (!product) {
		return (
			<S.Empty>
				<h2>Товар не найден</h2>
				<Link href='/goods'>← вернуться к товарам</Link>
			</S.Empty>
		)
	}

	return (
		<S.Wrap>
			<S.Breadcrumbs>
				<Link href='/'>Главная</Link> <span>•</span>
				<Link href='/goods'>Товары</Link> <span>•</span>
				<span>{product.name}</span>
			</S.Breadcrumbs>

			<S.Grid>
				{/* LEFT: GALLERY */}
				<S.Left>
					<S.Sticky>
						<S.MainImg>
							<Swiper
								modules={[Navigation, Thumbs]}
								navigation
								slidesPerView={1}
								roundLengths
								watchOverflow
								observer
								observeParents
								resizeObserver
								style={{ width: '100%', maxWidth: '100%', overflow: 'hidden' }}
								spaceBetween={10}
								thumbs={{
									swiper:
										thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
								}}
								onInit={s => {
									requestAnimationFrame(() => s.update())
								}}
								onResize={s => {
									requestAnimationFrame(() => s.update())
								}}
							>
								{product.images.map((src, i) => (
									<SwiperSlide key={`main-${i}`}>
										<img src={src} alt={`${product.name} ${i + 1}`} />
									</SwiperSlide>
								))}
							</Swiper>
						</S.MainImg>

						{product.images.length > 1 && (
							<S.ThumbsWrap>
								<Swiper
									onSwiper={s => {
										setThumbsSwiper(s)
										requestAnimationFrame(() => s.update())
									}}
									modules={[FreeMode, Thumbs]}
									freeMode
									watchSlidesProgress
									slidesPerView={'auto'}
									watchOverflow
									observer
									observeParents
									resizeObserver
									style={{ width: '100%', maxWidth: '100%', overflow: 'hidden' }}
									spaceBetween={10}
									breakpoints={{
										0: { spaceBetween: 8 },
										520: { spaceBetween: 10 },
									}}
								>
									{product.images.map((src, i) => (
										<SwiperSlide key={`thumb-${i}`}>
											<img src={src} alt={`${product.name} thumb ${i + 1}`} />
										</SwiperSlide>
									))}
								</Swiper>
							</S.ThumbsWrap>
						)}
					</S.Sticky>
				</S.Left>

				{/* RIGHT: INFO */}
				<S.Right>
					<S.TitleRow>
						<h1>{product.name}</h1>
						{product.badges?.map((b, i) => (
							<S.Badge key={i} data-tone={b.tone}>
								{b.text}
							</S.Badge>
						))}
					</S.TitleRow>

					<S.Short>{product.short}</S.Short>

					<S.PriceRow>
						<div className='price'>
							<strong>{product.price} ₽</strong>
							{product.oldPrice && <s>{product.oldPrice} ₽</s>}
						</div>
						<div className='cta'>
							{product.wbUrl && (
								<a href={product.wbUrl} target='_blank' rel='noreferrer'>
									<WbButton>
										Купить на <WBIcon />
									</WbButton>
								</a>
							)}
							{product.ozonUrl && (
								<a href={product.ozonUrl} target='_blank' rel='noreferrer'>
									<OzonBtn>
										Купить на <OzonIcon />
									</OzonBtn>
								</a>
							)}
						</div>
					</S.PriceRow>

					<S.Divider />

					{/* Tabs */}
					<S.Tabs>
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
					</S.Tabs>

					<S.TabBody>
						{tab === 'desc' && <p>{product.description}</p>}
						{tab === 'specs' &&
							(typeof product.specs === 'string' ? (
								<p>{product.specs || 'Характеристики появятся позже.'}</p>
							) : (
								<S.SpecTable>
									{Object.keys(product.specs).length > 0
										? Object.entries(product.specs).map(([k, v]) => (
												<li key={k}>
													<span>{k}</span>
													<i />
													<b>{v}</b>
												</li>
										  ))
										: 'Характеристики появятся позже.'}
								</S.SpecTable>
							))}
						{tab === 'ingr' && <p>{product.ingredients ?? 'Состав см. на упаковке.'}</p>}
						{tab === 'ship' && (
							<p>{product.shipping ?? 'Информация о доставке появится позже.'}</p>
						)}
					</S.TabBody>

					<S.SmallNote>
						{product.hint?.trim()
							? product.hint
							: '* Фото носит ознакомительный характер. Комплектация может слегка отличаться (в рамках концепции набора).'}
					</S.SmallNote>
				</S.Right>
			</S.Grid>
		</S.Wrap>
	)
}

