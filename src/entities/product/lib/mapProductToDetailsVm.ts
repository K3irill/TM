import type { ProductDetailsVm, ProductFromApi, ProductLabel } from '../model/types'

export function mapProductToDetailsVm(product: ProductFromApi | null): ProductDetailsVm | null {
	if (!product) return null

	const mainImg = product.img
	const extra = Array.isArray(product.images) ? product.images : []
	const images = [mainImg, ...extra]
		.filter(Boolean)
		.filter((src, i, arr) => arr.indexOf(src) === i) as string[]

	const badges: ProductLabel[] = []
	if (product.hot) badges.push({ text: 'Хит', tone: 'hot' })
	if (product.new) badges.push({ text: 'Новинка', tone: 'new' })
	if (product.limited) badges.push({ text: 'Limited', tone: 'limited' })
	if (product.salePercent != null && Number(product.salePercent) > 0) {
		badges.push({ text: `-${product.salePercent}%`, tone: 'sale' })
	}

	return {
		id: product.id,
		slug: product.slug,
		name: product.name,
		price: product.price,
		oldPrice: product.oldPrice,
		images,
		badges: badges.length ? badges : undefined,
		short: product.desc || '',
		description: product.desc || '',
		specs:
			typeof product.specifications === 'string'
				? product.specifications
				: product.specifications || {},
		ingredients: product.composition ?? undefined,
		shipping: product.delivery ?? undefined,
		hint: product.hint ?? undefined,
		wbUrl: product.wbUrl ?? undefined,
		ozonUrl: product.ozonUrl ?? null,
	}
}

