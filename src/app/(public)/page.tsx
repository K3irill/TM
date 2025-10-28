import React from 'react'
import Container from '@/shared/ui/container/Container'
import HeroWidget from '@/widgets/hero/HeroWidget'
import About from '@/widgets/about/ui/About/About'

export const revalidate = 60

export default function Home() {
	return (
		<div>
			<HeroWidget />
			<About />
		</div>
	)
}
