import { useEffect, useRef } from 'react'

type BlowAnim =
	| 'blow-soft-left'
	| 'blow-medium-left'
	| 'blow-hard-left'
	| 'blow-soft-right'
	| 'blow-medium-right'
	| 'blow-hard-right'

type SwayAnim =
	| 'sway-0'
	| 'sway-1'
	| 'sway-2'
	| 'sway-3'
	| 'sway-4'
	| 'sway-5'
	| 'sway-6'
	| 'sway-7'
	| 'sway-8'

const blowAnimations: BlowAnim[] = [
	'blow-soft-left',
	'blow-medium-left',
	'blow-hard-left',
	'blow-soft-right',
	'blow-medium-right',
	'blow-hard-right',
]

const swayAnimations: SwayAnim[] = [
	'sway-0',
	'sway-1',
	'sway-2',
	'sway-3',
	'sway-4',
	'sway-5',
	'sway-6',
	'sway-7',
	'sway-8',
]

function getRandomInt(min: number, max: number) {
	return Math.floor(Math.random() * (max - min + 1)) + min
}

function sample<T>(arr: T[]): T {
	return arr[Math.floor(Math.random() * arr.length)]
}

const FallingSakura: React.FC = () => {
	const rootRef = useRef<HTMLDivElement>(null)
	const timerRef = useRef<number | null>(null)

	useEffect(() => {
		const root = rootRef.current
		if (!root) return

		const reduced =
			typeof window !== 'undefined' &&
			window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches
		if (reduced) return

		const createPetal = () => {
			const el = document.createElement('div')
			el.className = 'tarimi-sakura'

			const size = getRandomInt(9, 14)
			const startLeft = Math.random() * window.innerWidth - 100
			const startTop = -getRandomInt(15, 35)

			const blow = sample(blowAnimations)
			const sway = sample(swayAnimations)
			const fallTime = (Math.round(window.innerHeight * 0.007) + Math.random() * 5) * 1 // fallSpeed

			const blowTime = ((fallTime > 30 ? fallTime : 30) - 20) + getRandomInt(0, 20)
			const swayTime = getRandomInt(2, 4)

			el.style.width = `${size}px`
			el.style.height = `${size}px`
			el.style.left = `${startLeft}px`
			// fall анимируем через `top`, а стартовую позицию — через отрицательный margin-top (как в jQuery версии)
			el.style.top = `0px`
			el.style.marginTop = `${startTop}px`
			el.style.animation = `fall ${fallTime}s linear 0s 1, ${blow} ${blowTime}s linear 0s infinite, ${sway} ${swayTime}s linear 0s infinite`

			const onAnimEnd = (ev: AnimationEvent) => {
				if (ev.animationName === 'fall') {
					el.removeEventListener('animationend', onAnimEnd)
					el.remove()
				}
			}

			const onIter = (ev: AnimationEvent) => {
				if (blowAnimations.includes(ev.animationName as BlowAnim)) {
					el.removeEventListener('animationiteration', onIter)
					el.removeEventListener('animationend', onAnimEnd)
					el.remove()
				}
			}

			el.addEventListener('animationend', onAnimEnd)
			el.addEventListener('animationiteration', onIter)

			root.appendChild(el)
		}

		// Start rate (newOn). Adaptive so it doesn't explode on huge screens.
		const area = (window.innerWidth * window.innerHeight) / (1920 * 1080)
		const newOn = Math.max(120, Math.min(320, Math.round(260 / Math.max(0.7, area))))

		timerRef.current = window.setInterval(() => {
			// cap: keep DOM small
			if (root.childElementCount > 80) return
			createPetal()
		}, newOn)

		return () => {
			if (timerRef.current != null) window.clearInterval(timerRef.current)
			timerRef.current = null
			root.replaceChildren()
		}
	}, [])

	return (
		<div
			ref={rootRef}
			aria-hidden
			style={{
				position: 'fixed',
				inset: 0,
				zIndex: 1000,
				pointerEvents: 'none',
				overflow: 'hidden',
			}}
		>
			<style jsx global>{`
				@keyframes fall {
					0% {
						opacity: 0.9;
						top: 0;
					}
					100% {
						opacity: 0.2;
						top: 110%;
					}
				}

				@keyframes blow-soft-left {
					0% {
						margin-left: 0;
					}
					100% {
						margin-left: -50%;
					}
				}
				@keyframes blow-medium-left {
					0% {
						margin-left: 0;
					}
					100% {
						margin-left: -100%;
					}
				}
				@keyframes blow-hard-left {
					0% {
						margin-left: 0;
					}
					100% {
						margin-left: -140%;
					}
				}
				@keyframes blow-soft-right {
					0% {
						margin-left: 0;
					}
					100% {
						margin-left: 50%;
					}
				}
				@keyframes blow-medium-right {
					0% {
						margin-left: 0;
					}
					100% {
						margin-left: 100%;
					}
				}
				@keyframes blow-hard-right {
					0% {
						margin-left: 0;
					}
					100% {
						margin-left: 140%;
					}
				}

				@keyframes sway-0 {
					0% {
						transform: rotate(-5deg);
					}
					40% {
						transform: rotate(28deg);
					}
					100% {
						transform: rotate(3deg);
					}
				}
				@keyframes sway-1 {
					0% {
						transform: rotate(10deg);
					}
					40% {
						transform: rotate(43deg);
					}
					100% {
						transform: rotate(15deg);
					}
				}
				@keyframes sway-2 {
					0% {
						transform: rotate(15deg);
					}
					40% {
						transform: rotate(56deg);
					}
					100% {
						transform: rotate(22deg);
					}
				}
				@keyframes sway-3 {
					0% {
						transform: rotate(25deg);
					}
					40% {
						transform: rotate(74deg);
					}
					100% {
						transform: rotate(37deg);
					}
				}
				@keyframes sway-4 {
					0% {
						transform: rotate(40deg);
					}
					40% {
						transform: rotate(68deg);
					}
					100% {
						transform: rotate(25deg);
					}
				}
				@keyframes sway-5 {
					0% {
						transform: rotate(50deg);
					}
					40% {
						transform: rotate(78deg);
					}
					100% {
						transform: rotate(40deg);
					}
				}
				@keyframes sway-6 {
					0% {
						transform: rotate(65deg);
					}
					40% {
						transform: rotate(92deg);
					}
					100% {
						transform: rotate(58deg);
					}
				}
				@keyframes sway-7 {
					0% {
						transform: rotate(72deg);
					}
					40% {
						transform: rotate(118deg);
					}
					100% {
						transform: rotate(68deg);
					}
				}
				@keyframes sway-8 {
					0% {
						transform: rotate(94deg);
					}
					40% {
						transform: rotate(136deg);
					}
					100% {
						transform: rotate(82deg);
					}
				}

				.tarimi-sakura {
					position: absolute;
					background: linear-gradient(
						120deg,
						rgba(255, 183, 197, 0.9),
						rgba(255, 197, 208, 0.9)
					);
					border-radius: 12px 1px;
					filter: drop-shadow(0 0 6px rgba(255, 79, 182, 0.15));
					will-change: top, margin-left, transform, opacity;
					pointer-events: none;
				}
			`}</style>
		</div>
	)
}

export default FallingSakura
