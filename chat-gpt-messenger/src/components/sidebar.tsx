import ChatList from '@/components/chat-list'
import LougOut from '@/components/logout'
import NewChat from '@/components/new-chat'

export default function Sidebar() {
	return (
		<div className="p-2 flex flex-col h-screen">
			<div className="flex-1">
				<div>
					<NewChat />
					<div>
						{/* model selector */}
					</div>
					{/* chatrows */}
					<ChatList />
				</div>
			</div>
			<LougOut />
		</div>
	)
}