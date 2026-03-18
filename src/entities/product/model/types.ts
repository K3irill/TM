export type ProductLabelTone = 'hot' | 'new' | 'sale' | 'limited' | 'mild'

export type ProductLabel = {
	text: string
	tone: ProductLabelTone
}

/**
 * Данные товара в формате, который приходит из `shared/services/directus/hooks.ts` (`useProduct`).
 * Держим здесь минимально необходимые поля, чтобы не тянуть UI-типизацию в `shared`.
 */
export type ProductFromApi = {
	id: number
	slug?: string
	name: string
	price: number
	oldPrice?: number
	img?: string
	images?: string[]
	desc?: string
	specifications?: Record<string, string> | string | null
	composition?: string | null
	delivery?: string | null
	hint?: string | null
	wbUrl?: string | null
	ozonUrl?: string | null
	hot?: boolean
	new?: boolean
	limited?: boolean
	salePercent?: number | null
}

export type ProductDetailsVm = {
	id: number
	slug?: string
	name: string
	price: number
	oldPrice?: number
	images: string[]
	badges?: ProductLabel[]
	short: string
	description: string
	specs: Record<string, string> | string
	ingredients?: string
	shipping?: string
	hint?: string
	wbUrl?: string
	ozonUrl?: string | null
}

