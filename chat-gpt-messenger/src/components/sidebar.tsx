import ChatList from '@/components/chat-list'
import LougOut from '@/components/logout'
import NewChat from '@/components/new-chat'
import ModelSelector from '@/components/model-selector'

export default function Sidebar() {
	return (
		<div className="p-2 flex flex-col h-screen">
			<div className="flex-1">
				<div>
					<NewChat />
					<div className='hidden sm:inline'>
						<ModelSelector />
					</div>
					<ChatList />
				</div>
			</div>
			<LougOut />
		</div>
	)
}