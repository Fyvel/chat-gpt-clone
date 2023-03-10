'use client'

import { useSession, signOut } from 'next-auth/react'

export default function LougOut() {
	const { data: session } = useSession()
	return session 
		? (
			<picture>
				<img
					onClick={() => signOut()}
					className='h-12 w-12 rounded-full cursor-pointer mx-auto mb-2 hover:opacity-50'
					src={session.user?.image || ''}
					alt="User image" />
			</picture>
		)
		: null
}