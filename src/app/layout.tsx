import type { Metadata } from 'next'
import { Nabla, Inter, Red_Rose } from 'next/font/google'
import '../styles/base.scss'
import StoreProvider from './providers/StoreProvider'
import { QueryProvider } from './providers/QueryProvider'
import Header from '@/widgets/header/Header'
import { IHeaderModes } from '@/widgets/header/model/types'
import StyledComponentsRegistry from '@/shared/ui/StyledComponentsRegistry/StyledComponentsRegistry.tsx'
import Footer from '@/widgets/footer/ui/Footer/Footer'

const nabla = Nabla({
	variable: '--font-nabla',
	subsets: ['latin'],
})
const red_rose = Red_Rose({
	variable: '--font-red-rose',
	subsets: ['latin'],
})

const inter = Inter({
	variable: '--font-inter',
	subsets: ['latin'],
})

export const metadata: Metadata = {
	metadataBase: new URL('https://tarimi.ru'),
	title: {
		default: 'TARIMI — Затарься Корейским вайбом 🥰',
		template: '%s | TARIMI',
	},
	description: `TARIMI — бренд, вдохновлённый K-дорамами, Сеулом и уличной атмосферой Кореи.
Мы собираем корейские наборы и вкусняшки: рамен, снеки, напитки и детали вайба.
Каждый бокс — это кусочек Сеула у тебя дома ✨`,

	keywords: [
		'рамен',
		'ramen',
		'корейская еда',
		'азиатские снеки',
		'азиатские сладости',
		'корейские снеки',
		'корейские сладости',
		'дорама бокс',
		'dorama box',
		'корейские наборы',
		'корейские боксы',
		'самьянг',
		'samyang',
		'TARIMI',
		'тарими',
		'korea box',
		'k-culture',
		'k-drama',
		'kpop товары',
		'корейская лапша',
		'seoul',
		'korean vibe',
		'магазин корейских товаров',
	],

	openGraph: {
		type: 'website',
		url: 'https://tarimi.ru',
		title: 'TARIMI — Затарься Корейским вайбом 🍜',
		description: `TARIMI — это не просто магазин. Это способ прочувствовать корейский вайб через еду, атмосферу и вдохновение K-дорам.`,
		siteName: 'TARIMI',
		// images: [
		//   {
		//     url: '/og/tarimi-og.jpg', // добавь это изображение в public/og/
		//     width: 1200,
		//     height: 630,
		//     alt: 'TARIMI Dorama Box и Spicy Box — корейские наборы и вайб',
		//   },
		// ],
		locale: 'ru_RU',
	},

	twitter: {
		card: 'summary_large_image',
		title: 'TARIMI — затарься Корейским вайбом 🍜',
		description: 'Корейские наборы, снеки и вайб — прямо у тебя дома. #TARIMI',
		// images: ['/og/tarimi-og.jpg'],
	},

	icons: {
		icon: '/favicon.ico',
		apple: '/apple-touch-icon.png',
	},

	authors: [{ name: 'TARIMI', url: 'https://tarimi.store' }],
	creator: 'TARIMI',
	publisher: 'TARIMI',

	alternates: {
		canonical: 'https://tarimi.store',
	},

	themeColor: '#0b0b0f',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='ru'>
			<body
				className={`${nabla.variable} ${red_rose.variable} ${inter.variable} antialiased`}
			>
				<StyledComponentsRegistry>
					<StoreProvider>
						<QueryProvider>
							<Header mode={IHeaderModes.main} />
							{children}
							<Footer />
						</QueryProvider>
					</StoreProvider>
				</StyledComponentsRegistry>
			</body>
		</html>
	)
}
