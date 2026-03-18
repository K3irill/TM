'use client'

import ProductDetailsWidget from '@/widgets/product-details-widget/ProductDetailsWidget'
import { useParams } from 'next/navigation'

export default function ProductPage() {
	const params = useParams() as { id?: string }
	const slugOrId = (params?.id || '').toString()
	return <ProductDetailsWidget slugOrId={slugOrId} />
}
