'use client'

import { PowerIcon } from '@heroicons/react/24/solid'
import { useSession } from 'next-auth/react'

export default function LougOut() {
	const { data: session } = useSession()
	return session
		? (
			<PowerIcon className='h-8 w-8 rounded-full cursor-pointer mx-auto mb-2 hover:scale-110' />
		)
		: null
}