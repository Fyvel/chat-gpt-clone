
import LougOut from './logout'
import NewChat from './new-chat'

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
				</div>
			</div>
			<LougOut />
		</div>
	)
}