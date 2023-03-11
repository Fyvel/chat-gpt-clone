import { adminDb } from '@/config/firebaseAdmin'
import { query } from '@/lib/query-openai'
import admin from 'firebase-admin'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
	answer: string,
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
	const { prompt, chatId, model, session } = req.body
	if (!prompt || !model || !session) {
		res.status(400).json({ answer: 'Invalid request' })
		return
	}

	const answer = await query({ prompt, model })
	const message: Message = {
		speaker: 'AI',
		message: answer,
		createdAt: admin.firestore.Timestamp.fromDate(new Date(admin.firestore.Timestamp.now().toDate().getTime() + 500)),
		user: {
			_id: 'AI',
			name: 'ChatGPT',
			avatar: 'https://ui-avatars.com/api/?name=AI&background=11a37f&color=fff',
		},
	}

	await adminDb.collection('users')
		.doc(session?.user?.email)
		.collection('chats')
		.doc(chatId)
		.collection('messages')
		.add(message)

	res.status(200).json({ answer })
}

/**
const conversationHistory = [
	{ speaker: 'User', message: 'Hello, how are you today?' },
	{ speaker: 'AI', message: 'I\'m good, thanks for asking. How can I help you today?' },
	{ speaker: 'User', message: 'Can you recommend a good Italian restaurant in the area?' },
];

const prompt = `Conversation:\n\n${conversationHistory.map(({ speaker, message }) => `${speaker}: ${message}`).join('\n')}\nAI: `;
*/