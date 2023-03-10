import Chat from '@/components/chat'
import ChatInput from '@/components/chat-input'

type ChatPageProps = {
	params: {
		id: string
	}
}
export default function ChatPage({ params: { id } }: ChatPageProps) {
	return (
		<div className="flex flex-col h-screen overflow-hidden">
			<Chat chatId={id} />
			<ChatInput chatId={id} />
		</div>
	)
}