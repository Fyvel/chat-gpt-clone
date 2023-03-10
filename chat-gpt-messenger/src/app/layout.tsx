import Sidebar from '@/components/sidebar'
import SessionProvider from '@/app/contexts/session-provider'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import Login from '@/components/login'
import ErrorBoundary from '@/components/error-boundary'
import './globals.css'

export const metadata = {
	title: 'Create Next App',
	description: 'Generated by create next app',
}

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	const session = await getServerSession(authOptions)
	return (
		<html lang="en">
			<head />
			<body>
				<ErrorBoundary>
					<SessionProvider session={session}>
						{!session
							? <Login />
							: (
								<div className='flex'>
									<div className="bg-[#202123] max-w-xs h-screen overflow-y-scroll-auto md:min-w-[20rem]">
										<Sidebar />
									</div>
									{/* Client provider */}
									<div className='bg-dark flex-1'>{children}</div>
								</div>
							)
						}
					</SessionProvider>
				</ErrorBoundary>
			</body>
		</html>
	)
}
