'use client'

import { SessionProvider as Provider, SessionProviderProps } from 'next-auth/react'

export default function SessionProvider({ children, session }: SessionProviderProps) {
	return (
		<Provider session={session}>
			{children}
		</Provider>
	)
}