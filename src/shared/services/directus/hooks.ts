import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { productsApi, ramenSetsApi, aboutBrandApi, whyUsApi } from './api'
import { directusClient, getImageUrl, getImageUrls } from './client'
import type { Product, RamenSet, AboutBrand, WhyUsItem } from './client'
import { readItems } from '@directus/sdk'

// Хуки для товаров
export function useProducts(params?: {
	category?: string
	sort?: string[]
}) {
	return useQuery({
		queryKey: ['products', params],
		queryFn: async () => {
			const filters: Record<string, any> = {}
			if (params?.category && params.category !== 'all') {
				filters.category = { _eq: params.category }
			}

			const result = await productsApi.getAll({
				filter: Object.keys(filters).length > 0 ? filters : undefined,
				sort: params?.sort || ['-dateAdded'],
			})

			return result.data.map((product: any) => {
				const mark = String(product?.mark ?? '').trim()
				return {
					id: product.id,
					slug: product.slug,
					name: product.name,
					img: getImageUrl(product.img),
					category: product.category,
					price: product.price != null ? Number(product.price) : 0,
					oldPrice:
						product.oldPrice != null && product.oldPrice !== ''
							? Number(product.oldPrice)
							: undefined,
					desc: product.desc,
					hot: mark === 'hot',
					new: mark === 'new',
					salePercent: product.salePercent,
					limited: mark === 'limited',
					comingSoon: mark === 'comingSoon',
					outOfStock: mark === 'outOfStock',
					dateAdded: product.dateAdded,
				}
			})
		},
	})
}

export function useProduct(slugOrId: string) {
	return useQuery({
		queryKey: ['product', slugOrId],
		queryFn: async () => {
			const numericId = Number(slugOrId)
			const product = Number.isFinite(numericId) && slugOrId.trim() !== ''
				? await productsApi.getById(numericId)
				: await productsApi.getBySlug(slugOrId)
			if (!product) return null

			// images: M2M через products_files может прийти как массив ID junction-строк (например [1,2])
			// В этом случае "раскрываем" до directus_files_id отдельным запросом.
			const rawImages = (product as any).images
			let extraImages: string[] = []
			if (
				Array.isArray(rawImages) &&
				rawImages.length > 0 &&
				rawImages.every((x: any) => typeof x === 'number')
			) {
				const junction = await directusClient.request(
					(readItems as any)('products_files', {
						filter: { id: { _in: rawImages } },
						fields: ['id', 'directus_files_id'],
					})
				)
				extraImages = Array.isArray(junction)
					? junction
							.map((row: any) => getImageUrl(row?.directus_files_id))
							.filter(Boolean)
					: []
			}

			const mark = String((product as any)?.mark ?? '').trim()
			return {
				id: product.id,
				slug: product.slug,
				name: product.name,
				img: getImageUrl(product.img),
				images:
					extraImages.length > 0
						? extraImages
						: getImageUrls(Array.isArray(rawImages) ? rawImages : []),
				category: product.category,
				price: product.price != null ? Number(product.price) : 0,
				oldPrice:
					product.oldPrice != null && product.oldPrice !== ''
						? Number(product.oldPrice)
						: undefined,
				desc: product.desc,
				hint: (product as any).hint,
				delivery: (product as any).delivery,
				specifications: (product as any).specifications,
				composition: (product as any).composition,
				hot: mark === 'hot',
				new: mark === 'new',
				salePercent: product.salePercent,
				limited: mark === 'limited',
				comingSoon: mark === 'comingSoon',
				outOfStock: mark === 'outOfStock',
				dateAdded: product.dateAdded,
				wbUrl: product.wbUrl,
				ozonUrl: product.ozonUrl,
			}
		},
		enabled: !!slugOrId,
	})
}

export function useCreateProduct() {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: (data: Partial<Product>) => productsApi.create(data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['products'] })
		},
	})
}

export function useUpdateProduct() {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: ({ id, data }: { id: number; data: Partial<Product> }) =>
			productsApi.update(id, data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['products'] })
		},
	})
}

export function useDeleteProduct() {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: (id: number) => productsApi.delete(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['products'] })
		},
	})
}

// Хуки для наборов
export function useRamenSets() {
	return useQuery({
		queryKey: ['ramenSets'],
		queryFn: async () => {
			const result = await ramenSetsApi.getAll({
				filter: { is_main: { _eq: true } },
				// `date_created` может быть запрещён для Public policy → сортируем по `id`
				sort: ['-id'],
			})

			return result.data.map((set: any) => {
				let topLabelArray: Array<{ text: string; tone: string }> = []
				if (set.topLabel) {
					if (typeof set.topLabel === 'object' && 'text' in set.topLabel) {
						topLabelArray = [
							{
								text: set.topLabel.text,
								tone: set.topLabel.tone,
							},
						]
					}
				}

				let labelsArray: Array<{ text: string; tone: string }> | null = null
				if (set.labels && Array.isArray(set.labels) && set.labels.length > 0) {
					labelsArray = set.labels.map((label: any) => ({
						text: label.text || '',
						tone: label.tone || 'mild',
					}))
				}

				return {
					id: set.id,
					name: set.name,
					link: set.link,
					img: getImageUrl(set.img),
					desc: set.desc,
					wbUrl: set.wbUrl,
					ozonUrl: set.ozonUrl,
					top_label: topLabelArray,
					labels: labelsArray,
				}
			})
		},
	})
}

export function useCreateRamenSet() {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: (data: Partial<RamenSet>) => ramenSetsApi.create(data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['ramenSets'] })
		},
	})
}

export function useUpdateRamenSet() {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: ({ id, data }: { id: number; data: Partial<RamenSet> }) =>
			ramenSetsApi.update(id, data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['ramenSets'] })
		},
	})
}

export function useDeleteRamenSet() {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: (id: number) => ramenSetsApi.delete(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['ramenSets'] })
		},
	})
}

// Хуки для информации о бренде
export function useAboutBrand() {
	return useQuery({
		queryKey: ['aboutBrand'],
		queryFn: async () => {
			const about = await aboutBrandApi.get()
			if (!about) return null

			const imagesRaw = (about as any).images
			const images = Array.isArray(imagesRaw)
				? imagesRaw
						.map((img: any) => getImageUrl(img))
						.filter((src: string) => Boolean(src))
				: []

			const paragraphs =
				typeof (about as any).paragraphs === 'string'
					? ((about as any).paragraphs as string)
					: (about as any).paragraphs?.map((p: any) =>
							typeof p === 'string' ? p : p.content
					  ) || []

			return {
				title: about.title,
				images,
				heading: about.heading,
				paragraphs,
				highlight: about.highlight,
			}
		},
	})
}

export function useUpdateAboutBrand() {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: (data: Partial<AboutBrand>) => aboutBrandApi.update(data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['aboutBrand'] })
		},
	})
}

// Хуки для секции "Почему TARIMI?" (why_us)
export function useWhyUs() {
	return useQuery<WhyUsItem[]>({
		queryKey: ['whyUs'],
		queryFn: async () => {
			const result = await whyUsApi.getAll()
			return result.data.map((item: any) => ({
				id: item.id,
				title: item.title,
				text: item.desc,
				desc: item.desc,
			}))
		},
	})
}
