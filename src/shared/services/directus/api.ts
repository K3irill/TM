import { createItem, deleteItem, readItem, readItems, readSingleton, updateItem } from '@directus/sdk'
import {
    AboutBrand,
    directusClient,
    Product,
    RamenSet
} from './client'

// SDK v20: readItems/readItem/readSingleton требуют явных generic-параметров Schema/Collection/Query.
// Чтобы не усложнять типы, используем лёгкий типовой "мостик".
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const rItems = (collection: any, query?: any) => (readItems as any)(collection, query)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const rItem = (collection: any, key: string | number, query?: any) =>
	(readItem as any)(collection, key, query)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const rSingleton = (collection: any, query?: any) =>
	(readSingleton as any)(collection, query)

// API для работы с товарами
export const productsApi = {
	async getAll(params?: {
		filter?: Record<string, any>
		sort?: string[]
		limit?: number
		page?: number
	}) {
		const query: any = {
			fields: ['*'],
		}

		if (params?.filter) {
			query.filter = params.filter
		}

		if (params?.sort) {
			query.sort = params.sort
		}

		if (params?.limit) {
			query.limit = params.limit
		}

		if (params?.page) {
			query.page = params.page
		}

		const products = await directusClient.request(
			rItems('products', query)
		)

		return {
			data: Array.isArray(products) ? products : [products],
			meta: {
				total: Array.isArray(products) ? products.length : 1,
			},
		}
	},

	async getById(id: number) {
		const product = await directusClient.request(
			rItem('products', id, { fields: ['*'] })
		)
		return product
	},

	async getBySlug(slug: string) {
		const products = await directusClient.request(
			rItems('products', {
				filter: { slug: { _eq: slug } },
				fields: ['*'],
				limit: 1,
			})
		)
		return Array.isArray(products) && products.length > 0 ? products[0] : null
	},

	async create(data: Partial<Product>) {
		const product = await directusClient.request(
			createItem('products', data as any)
		)
		return product
	},

	async update(id: number, data: Partial<Product>) {
		const product = await directusClient.request(
			updateItem('products', id, data as any)
		)
		return product
	},

	async delete(id: number) {
		await directusClient.request(deleteItem('products', id))
	},
}

// API для работы с наборами
export const ramenSetsApi = {
	async getAll(params?: {
		filter?: Record<string, any>
		sort?: string[]
		limit?: number
	}) {
		const query: any = {
			// Безопасный запрос: Public-роль часто ограничивает системные поля и вложенные поля
			fields: ['*'],
		}

		if (params?.filter) {
			query.filter = params.filter
		}

		if (params?.sort) {
			query.sort = params.sort
		}

		if (params?.limit) {
			query.limit = params.limit
		}

		const sets = await directusClient.request(
			rItems('ramen_sets', query)
		)

		return {
			data: Array.isArray(sets) ? sets : [sets],
			meta: {
				total: Array.isArray(sets) ? sets.length : 1,
			},
		}
	},

	async getById(id: number) {
		const set = await directusClient.request(
			rItem('ramen_sets', id, {
				fields: ['*', 'topLabel.*', 'labels.*'],
			})
		)
		return set
	},

	async create(data: Partial<RamenSet>) {
		const set = await directusClient.request(
			createItem('ramen_sets', data as any)
		)
		return set
	},

	async update(id: number, data: Partial<RamenSet>) {
		const set = await directusClient.request(
			updateItem('ramen_sets', id, data as any)
		)
		return set
	},

	async delete(id: number) {
		await directusClient.request(deleteItem('ramen_sets', id))
	},
}

// API для работы с информацией о бренде
export const aboutBrandApi = {
	async get() {
		const about = await directusClient.request(
			rSingleton('about_brand', {
				fields: ['*', 'images.*', 'paragraphs.*'],
			})
		)
		return about
	},

	async update(data: Partial<AboutBrand>) {
		const about = await directusClient.request(
			updateItem('about_brand', 1, data as any)
		)
		return about
	},
}

// API для секции "Почему TARIMI?" (why_us)
export const whyUsApi = {
	async getAll() {
		const items = await directusClient.request(
			rItems('why_us', {
				fields: ['id', 'title', 'desc'],
				sort: ['id'],
			})
		)

		return {
			data: Array.isArray(items) ? items : [items],
			meta: {
				total: Array.isArray(items) ? items.length : 1,
			},
		}
	},
}
