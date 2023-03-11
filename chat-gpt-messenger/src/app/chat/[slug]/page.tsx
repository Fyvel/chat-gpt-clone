import Chat from '@/components/chat'
import ChatInput from '@/components/chat-input'

type ChatPageProps = {
	params: {
		slug: string
	}
}
export default function ChatPage({ params: { slug: id } }: ChatPageProps) {
	return (
		<div className="flex flex-col h-screen overflow-hidden">
			<Chat chatId={id} />
			<ChatInput chatId={id} />
		</div>
	)
}