import { Product } from './model/types'

export const PRODUCTS: Product[] = [
	{
		id: 1,
		slug: 'dorama-box',
		name: 'TARIMI Dorama Box',
		img: '/images/ramens/dorama.png',
		category: 'sets',
		price: 749,
		oldPrice: 899,
		desc: 'Мягкий набор для вечеров под дораму 🏮',
		hot: true,
		salePercent: 17,
		dateAdded: '2025-10-29',
	},
	{
		id: 2,
		slug: 'spicy-box',
		name: 'TARIMI Spicy Box',
		img: '/images/ramens/spicy.png',
		category: 'sets',
		price: 799,
		desc: 'Острый набор с корейским вайбом 🌶️',
		new: true,
		dateAdded: '2025-10-26',
	},
	{
		id: 3,
		slug: 'cheesy-box',
		name: 'TARIMI Cheesy Box',
		img: '/images/ramens/cheesy.png',
		category: 'sets',
		price: 799,
		desc: 'Супер сырный набор 🧀',
		limited: true,

		dateAdded: '2025-10-27',
	},

	{
		id: 4,
		slug: 'k-pop-figure',
		name: 'K-Pop Figure',
		img: '/images/figure.jpg',
		category: 'figures',
		price: 1299,
		oldPrice: 1499,
		desc: 'Мини-фигурка героя дорамы — собери коллекцию ✨',
		salePercent: 13,
		outOfStock: true,
		dateAdded: '2025-10-05',
	},
]
