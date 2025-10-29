import type { Metadata } from 'next'
import { Nabla, Inter, Red_Rose } from 'next/font/google'
import '../../styles/base.scss'
import StoreProvider from '../providers/StoreProvider'
import { QueryProvider } from '../providers/QueryProvider'
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
	title: 'TARIMI - затарься Корейским вайбом',
	description: `TARIMI — это команда, вдохновлённая корейской культурой, дорамами и уютом. Мы начали с простого желания — передать атмосферу K-дорам: теплую еду, эмоции, яркие цвета и немного магии.

    Наши наборы и товары — не просто еда, это способ ощутить себя частью маленькой истории. Мы отбираем только оригинальные продукты и собираем их с любовью, чтобы каждая коробка приносила улыбку.`,
	keywords: [
		'рамен',
		'азиатские снеки',
		'азиатские сладности',
		'дорама бокс',
		'корейские снеки',
		'корейские сладости',
		'азия',
		'дорама',
		'samyang',
		'тарими',
		'tarimi',
		'корейские наборы',
		'корейские боксы',
		'корейская лапша',
		'корейский вайб',
	],
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
