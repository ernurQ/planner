import type { Metadata } from 'next'
import { Noto_Sans } from 'next/font/google'

import './globals.css'
import { Providers } from '@/app/_providers'

const font = Noto_Sans({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'Planner',
	description: 'Planner app'
}

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en'>
			<body className={font.className}>
				<Providers>{children}</Providers>
			</body>
		</html>
	)
}
