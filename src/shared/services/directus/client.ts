import type { RestClient } from '@directus/sdk'
import {
  createDirectus,
  rest
} from '@directus/sdk'

const DIRECTUS_URL = process.env.NEXT_PUBLIC_DIRECTUS_URL || 'http://localhost:8055'

// Базовый тип схемы (будет расширен после генерации типов)
type Schema = {
	products: Product
	ramen_sets: RamenSet
	about_brand: AboutBrand
	why_us: WhyUsItem
}

export type DirectusSchema = Schema

export interface Product {
	id: number
	name: string
	slug: string
	img?: string | { id: string; url: string }
	category: 'sets' | 'ramen' | 'snacks' | 'figures' | 'sweets' | 'drinks' | 'clothes' | 'sweet-sets'
	price: number
	oldPrice?: number
	desc: string
	hot?: boolean
	new?: boolean
	salePercent?: number
	limited?: boolean
	comingSoon?: boolean
	outOfStock?: boolean
	dateAdded: string
	wbUrl?: string
	ozonUrl?: string
	status?: string
}

export interface RamenSet {
	id: number
	name: string
	link: string
	img?: string | { id: string; url: string }
	desc: string
	wbUrl?: string
	ozonUrl?: string
	topLabel?: Label
	labels?: Label[]
	status?: string
}

export interface Label {
	text: string
	tone: 'hot' | 'new' | 'sale' | 'limited' | 'mild'
}

export interface AboutBrand {
	id: number
	title: string
	images?: string[] | Array<{ id: string; url: string }>
	heading: string
	paragraphs?: Paragraph[]
	highlight?: string
	status?: string
}

export interface Paragraph {
	content: string
}

export type WhyUsIconKey = 'heart' | 'film' | 'cookie' | 'box'

export interface WhyUsItem {
	id: number
	title: string
	// В Directus у тебя сейчас поле называется `desc`, поэтому поддерживаем оба варианта
	text?: string
	desc?: string
	// Иконки оставляем локально, но если позже добавишь поле `icon` — начнём использовать
	icon?: WhyUsIconKey
	sort?: number
	status?: string
}

// Создаём клиент Directus
const directus = createDirectus<Schema>(DIRECTUS_URL).with(rest())

// Public API: используем клиент без токена (доступ управляется через Public Policy в Directus)
export const directusClient = directus as RestClient<Schema>

// Helper для получения URL изображения
export function getImageUrl(image: any): string {
	if (!image) return ''
	if (typeof image === 'string') {
		// Directus часто возвращает file id (UUID) строкой
		const isUuid =
			/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
				image
			)
		if (isUuid) return `${DIRECTUS_URL}/assets/${image}`
		// Если это уже URL
		return image
	}
	// M2M / junction форматы (например, about_brand.images)
	if (image.directus_files_id) {
		return getImageUrl(image.directus_files_id)
	}
	if (image.file) {
		return getImageUrl(image.file)
	}
	if (image.image) {
		return getImageUrl(image.image)
	}
	if (image.id && typeof image.id === 'string') {
		// Если это объект файла без `url`, но с `id`
		return `${DIRECTUS_URL}/assets/${image.id}`
	}
	if (image.id && image.url) {
		return image.url.startsWith('http') ? image.url : `${DIRECTUS_URL}/assets/${image.id}`
	}
	return ''
}

// Helper для получения массива изображений
export function getImageUrls(images: any[]): string[] {
	if (!images || !Array.isArray(images)) return []
	return images.map(img => getImageUrl(img))
}
