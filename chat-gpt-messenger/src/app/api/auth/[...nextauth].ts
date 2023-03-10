import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

export const authOptions = {
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_ID || 'Missing GOOGLE_ID env var',
			clientSecret: process.env.GOOGLE_SECRET || 'Missing GOOGLE_SECRET env var',
		}),
		// ...add more providers here
	],
}
export default NextAuth(authOptions)