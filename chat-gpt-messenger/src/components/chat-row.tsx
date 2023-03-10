'use client'

import { db } from '@/config/firebase'
import { ChatBubbleLeftIcon, TrashIcon } from '@heroicons/react/24/outline'
import { collection, deleteDoc, doc } from 'firebase/firestore'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useCollection } from 'react-firebase-hooks/firestore'

type ChatRowProps = {
	id: string,
}
export default function ChatRow({ id }: ChatRowProps) {
	const pathname = usePathname()
	const router = useRouter()
	const { data: session } = useSession()
	const [active, setActive] = useState<boolean>()

	useEffect(() => {
		if (!pathname) return
		setActive(pathname.includes(id))
	}, [pathname, id])

	if (!session?.user?.email) return null

	const [messages] = useCollection(
		collection(db, 'users', session.user.email, 'chats', id, 'messages')
	)

	const removeChat = async () => {
		if (!session?.user?.email) return
		await deleteDoc(doc(db, 'users', session.user.email, 'chats', id))
		router.replace('/')
	}

	return (
		<Link
			href={`/chat/${id}`}
			className={`chatRow justify-center ${active && 'bg-gray-700/50'} my-2`} >
			<ChatBubbleLeftIcon className="h-5 w-5" />
			<p className="flex-1 hidden md:inline-flex truncate" >
				{messages?.docs[messages?.docs?.length - 1]?.data()?.message || 'New Chat'}
			</p>
			<p className="flex-1 sm:inline-flex md:hidden lg:hidden">...</p>
			<TrashIcon
				onClick={removeChat}
				className="h-5 w-5 text-gray-700 hover:text-orange-700" />
		</Link>
	)
}