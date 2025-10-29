// shared/ui/section-dots/SectionDots.tsx
'use client'
import React, { useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'

type Props = {
	containerRef: React.RefObject<HTMLDivElement>
	sections: string[]
}

export default function SectionDots({ containerRef, sections }: Props) {
	const [active, setActive] = useState(sections[0])

	useEffect(() => {
		const container = containerRef.current
		if (!container) return

		const opts: IntersectionObserverInit = {
			root: container,
			rootMargin: '0px 0px -40% 0px', // активирует чуть раньше
			threshold: 0.6,
		}

		const handler: IntersectionObserverCallback = entries => {
			entries.forEach(entry => {
				if (entry.isIntersecting) setActive(entry.target.id)
			})
		}

		const io = new IntersectionObserver(handler, opts)
		sections.forEach(id => {
			const el = document.getElementById(id)
			if (el) io.observe(el)
		})
		return () => io.disconnect()
	}, [containerRef, sections])

	const dots = useMemo(
		() =>
			sections.map(id => (
				<Dot
					key={id}
					aria-label={id}
					data-active={active === id}
					onClick={() =>
						document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
					}
				/>
			)),
		[sections, active]
	)

	return <DotsWrap>{dots}</DotsWrap>
}

const DotsWrap = styled.div`
	position: fixed;
	right: 16px;
	top: 50%;
	transform: translateY(-50%);
	z-index: 50;
	display: flex;
	flex-direction: column;
	gap: 12px;
	pointer-events: auto;

	@media (max-width: 1023px) {
		display: none;
	}
`

const Dot = styled.button`
	width: 10px;
	height: 10px;
	border-radius: 999px;
	background: rgba(255, 255, 255, 0.25);
	border: none;
	cursor: pointer;
	padding: 0;
	transition: all 0.25s ease;
	box-shadow: 0 0 0 0 rgba(255, 79, 182, 0);

	&[data-active='true'] {
		transform: scale(1.4);
		background: #fff;
		box-shadow: 0 0 14px rgba(255, 79, 182, 0.6),
			0 0 20px rgba(0, 224, 255, 0.4);
	}

	&:hover {
		transform: scale(1.25);
		background: #e6faff;
	}
`
