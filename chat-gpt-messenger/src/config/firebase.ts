import { initializeApp, getApp, getApps } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyD2BsrNzojAmp3vS2manKEIpYfWFec51Ko',
	authDomain: 'chatgpt-messenger-6bc1e.firebaseapp.com',
	projectId: 'chatgpt-messenger-6bc1e',
	storageBucket: 'chatgpt-messenger-6bc1e.appspot.com',
	messagingSenderId: '3813002511',
	appId: '1:3813002511:web:f0e22d5961dcab6c28c27a'
}

// Initialize Firebase
const app = getApps()?.length
	? getApp()
	: initializeApp(firebaseConfig)

const db = getFirestore(app)

export { db }
