'use client'

import useSWR from 'swr'
import Select from 'react-select'
import { useId } from 'react'

const fetchModels = () => fetch('/api/getEngines').then((res) => res.json() as Promise<ModelsData>)

export default function ModelSelector() {
	const { data: models, isLoading } = useSWR('models', fetchModels)
	const { data: model, mutate: setModel } = useSWR('model', {
		fallbackData: 'text-davinci-003'
	})

	return (
		<div className="mt-2">
			<Select
				instanceId={useId()}
				className='selectControl'
				menuPosition='fixed'
				isSearchable
				isLoading={isLoading}
				defaultValue={model}
				placeholder={model}
				options={models?.options}
				onChange={e => setModel(e.value)}
			/>
		</div>
	)
}