'use client'

import { db } from '@/config/firebase'
import { PaperAirplaneIcon } from '@heroicons/react/24/outline'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { useSession } from 'next-auth/react'
import { FormEvent, useState } from 'react'
import toast from 'react-hot-toast'
import ModelSelector from '@/components/model-selector'
import useSWR from 'swr'

type ChatInputProps = {
	chatId: string
}
export default function ChatInput({ chatId }: ChatInputProps) {
	const [prompt, setPrompt] = useState('')
	const { data: session } = useSession()

	const { data: model } = useSWR('model', {
		fallbackData: 'text-davinci-003'
	})

	const submit = async (e: FormEvent<HTMLFormElement>) => {
		if (!session?.user?.email) return null
		e.preventDefault()
		if (!prompt?.trim()) return

		const input = prompt.trim()
		setPrompt('')

		const message: Message = {
			speaker: 'User',
			message: input,
			createdAt: serverTimestamp(),
			user: {
				_id: session.user.email,
				name: session.user.name || 'Lorem Ipsum',
				avatar: session.user.image || `https://ui-avatars.com/api/?name=${session.user?.name}`,
			}
		}

		await addDoc(
			collection(db, 'users', session.user.email, 'chats', chatId, 'messages'), message
		)

		const notification = toast.loading('Let me see...')

		const result = await fetch('/api/askQuestion', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				prompt: input,
				chatId,
				model,
				session,
			})
		})
		if (result.ok) {
			toast.dismiss(notification)
			toast.success('The AI answered!', { id: notification })
		} else {
			toast.dismiss(notification)
			toast.error('Hmmm... the AI can\'t tell right now.')
		}
	}

	return (
		<div className="bg-gray-700/50 text-gray-400 text-sm">
			<form
				onSubmit={submit}
				className="p-5 space-x-5 flex">
				<input
					className='bg-transparent focus:outline-none flex-1 disabled:cursor-not-allowed'
					value={prompt}
					onChange={e => setPrompt(e.target.value)}
					type="text"
					placeholder="Ask anything" />
				<button
					type="submit"
					disabled={!prompt || !session}
					className="bg-[#11a37f] hover:opacity-50 text-white font-bold px-3 py-3 rounded-full cursor-pointer disabled:cursor-none disabled:bg-gray-500">
					<PaperAirplaneIcon className="h-4 w-4 -rotate-45" />
				</button>
			</form>

			<div className='md:hidden'>
				<ModelSelector />
			</div>
		</div>
	)
}
