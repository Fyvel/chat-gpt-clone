import { CreateCompletionRequest } from 'openai'
import openai from './openai'

const couldNotRespond = 'ChatGPT was unable to respond for that!'

export const query = async (request: CreateCompletionRequest) => {
	try {
		const response = await openai.createCompletion({
			model: request.model || 'text-davinci-003',
			prompt: request.prompt || 'Hello there!',
			max_tokens: request.max_tokens || 100,
			temperature: request.temperature || .9,
			top_p: request.top_p || 1,
			frequency_penalty: request.frequency_penalty || 0,
			presence_penalty: request.presence_penalty || 0,
		})
		console.log(response.status, response.statusText)
		return response.data?.choices[0]?.text || couldNotRespond
	} catch (error: unknown) {
		return error instanceof Error
			? `${couldNotRespond} (Error: ${error.message || 'no message'})`
			: couldNotRespond
	}
}
