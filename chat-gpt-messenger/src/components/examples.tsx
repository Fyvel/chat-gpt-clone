'use client'

import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { db } from '@/config/firebase'
import { useId, useState } from 'react'
import useSWR from 'swr'
import toast from 'react-hot-toast'

const ExampleList = [
	'"What is a Rickroll?"',
	'"Who\'s the best electronic band? and why Daft Punk?"',
	'"Is the universe flat and what does it mean?"',
]

export default function Examples() {
	const router = useRouter()
	const { data: session } = useSession()
	const { data: model } = useSWR('model', {
		fallbackData: 'text-davinci-003'
	})
	const [isLoading, setIsLoading] = useState(false)

	const createNewChat = async (prompt: string) => {
		if (!session?.user?.email || !prompt) return
		try {
			setIsLoading(true)
			const doc = await addDoc(collection(db, 'users', session.user.email, 'chats'), {
				userId: session.user.email,
				createdAt: serverTimestamp(),
			})
			const message: Message = {
				speaker: 'User',
				message: prompt,
				createdAt: serverTimestamp(),
				user: {
					_id: session.user.email,
					name: session.user.name || 'Lorem Ipsum',
					avatar: session.user.image || `https://ui-avatars.com/api/?name=${session.user?.name}`,
				}
			}
			await addDoc(
				collection(db, 'users', session.user.email, 'chats', doc.id, 'messages'), message
			)
			const notification = toast.loading('Let me see...')
			const result = await fetch('/api/askQuestion', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					prompt,
					chatId: doc.id,
					model,
					session,
				})
			})
			if (result.ok) {
				toast.dismiss(notification)
				toast.success('Here\'s an answer!', { id: notification })
			} else {
				toast.dismiss(notification)
				toast.error('Hmmm... I can\'t tell right now.')
			}
			router.push(`/chat/${doc.id}`)
		} catch (error) {
			toast.error('Hmmm... I can\'t tell right now.')
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<>
			{ExampleList.map((example) => <p
				key={useId()}
				className={`infoText ${isLoading ? 'opacity-50' : 'cursor-pointer'}`}
				onClick={() => !isLoading && createNewChat(example)}>
				{example}
			</p>)}
		</>
	)
}
