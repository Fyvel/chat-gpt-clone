'use client'
import React, { Component, ErrorInfo, ReactNode } from 'react'

type Props = {
	children?: ReactNode
}

type State = {
	hasError: boolean
}

class ErrorBoundary extends Component<Props, State> {
	public state: State = {
		hasError: false
	}

	public static getDerivedStateFromError(error: Error): State {
		console.error('getDerivedStateFromError', error)
		// Update state so the next render will show the fallback UI.
		return { hasError: true }
	}

	public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
		console.error('Uncaught error:', error, errorInfo)
	}

	public render() {
		if (this.state.hasError) {
			return <h1>Sorry.. there was an error</h1>
		}

		return this.props.children
	}
}

export default ErrorBoundary