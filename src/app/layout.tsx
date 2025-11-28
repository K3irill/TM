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
		default:
			'TARIMI — Корейские наборы еды и снеков с доставкой | на  Wildberries, Ozon',
		template: '%s | TARIMI — корейские боксы',
	},
	description: `🍜 Корейские наборы TARIMI: рамен Buldak, нори, сладости. 
	Купить на Wildberries и Ozon. 
	Dorama Box и Spicy Box — готовый подарок или вечер в корейском стиле. 
	Доставка по всей России.`,

	keywords: [
		'купить корейский набор',
		'корейская еда Wildberries',
		'рамен Buldak Ozon',
		'корейские снеки заказать',
		'дорама бокс купить',
		'спайси бокс самьянг',
		'корейские сладости Россия',
		'набор корейской еды подарок',
		'TARIMI отзывы',
		'корейская лапша с доставкой',
		'милкис купить',
		'корейские напитки',
		'korean food Russia',
		'корейский вайб бокс',
		'seoul box',
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
		title: 'TARIMI — Корейские наборы еды на Wildberries и Ozon',
		description:
			'🍜 Корейские боксы с раменом, снеками и напитками. В наличии на маркетплейсах.  Твой корейский вечер начинается здесь!.',
		siteName: 'TARIMI',
		// images: [
		//   {
		//     url: '/og/tarimi-og.jpg',
		//     width: 1200,
		//     height: 630,
		//     alt: 'TARIMI — корейские наборы Dorama Box и Spicy Box',
		//   },
		// ],
		locale: 'ru_RU',
	},

	twitter: {
		card: 'summary_large_image',
		title: 'TARIMI — корейские наборы еды на Wildberries',
		description:
			'Рамен Buldak, напитки Milky, сладости. Готовые боксы с корейским вайбом 🎌',
		// images: ['/og/tarimi-og.jpg'],
	},

	icons: {
		icon: '/favicon.ico',
		apple: '/apple-touch-icon.png',
	},

	authors: [{ name: 'TARIMI', url: 'https://tarimi.ru' }],
	creator: 'TARIMI',
	publisher: 'TARIMI',

	alternates: {
		canonical: 'https://tarimi.ru',
	},

	themeColor: '#0b0b0f',

	// Добавляем structured data для лучшего SEO
	other: {
		'og:price:amount': '990',
		'og:price:currency': 'RUB',
	},
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
