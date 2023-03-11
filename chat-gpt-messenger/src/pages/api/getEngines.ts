import openai from '@/lib/openai'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse<ModelsData>) {
	const models = (await openai.listModels()).data.data
	const options = models.map(model => ({
		value: model.id,
		label: model.id,
	}))

	res.status(200).json({ options: options })
}
