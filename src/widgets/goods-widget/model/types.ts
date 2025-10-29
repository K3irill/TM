export type Category = 'sets' | 'ramen' | 'snacks' | 'figures'
export type TSort = 'newest' | 'price'

export type LabelTone = 'hot' | 'new' | 'sale' | 'limited' | 'mild'
export type Label = { text: string; tone: LabelTone }

export type Product = {
	id: number
	slug?: string
	name: string
	img: string
	category: Category
	price: number
	oldPrice?: number
	desc: string

	// статусы/лейблы
	hot?: boolean
	new?: boolean
	salePercent?: number // например 15 => "-15%"
	limited?: boolean

	// доступность
	comingSoon?: boolean
	outOfStock?: boolean

	dateAdded: string
}
