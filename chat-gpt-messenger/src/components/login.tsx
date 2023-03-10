'use client'
import Image from 'next/image'
import { signIn } from 'next-auth/react'

export default function Login() {
	return (
		<div className='bg-[#11a37f] h-screen flex flex-col items-center justify-center text-center'>
			<Image
				src="https://links.papareact.com/2i6"
				width={300}
				height={300}
				alt="logo"
			/>
			<button className='signIn' onClick={() => signIn('google')}>Sign In with Google</button>
		</div>
	)
}