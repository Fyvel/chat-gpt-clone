'use client'

import { useCollection } from 'react-firebase-hooks/firestore'
import { useSession } from 'next-auth/react'
import { db } from '@/config/firebase'
import { collection, orderBy, query } from 'firebase/firestore'
import ChatRow from '@/components/chat-row'

export default function ChatList() {
	const { data: session } = useSession()
	
	if (!session?.user?.email) return null
	
	const [chats, loading, error] = useCollection(
		session && query(
			collection(db, 'users', session.user.email, 'chats'),
			orderBy('createdAt', 'desc')
		)
	)

	return (
		<div>
			{chats?.docs.map(chat => (
				<ChatRow key={chat.id} id={chat.id} />
			))}
		</div>
	)
}