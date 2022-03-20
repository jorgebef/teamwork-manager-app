// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
// import { getAnalytics } from 'firebase/analytics'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { Firestore, getFirestore } from 'firebase/firestore'
import { Auth, getAuth, GoogleAuthProvider } from 'firebase/auth'

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDqa1oD7sJ4PZimRnssXKzaCGzlSd_gapw',
  authDomain: 'teamwork-manager-app.firebaseapp.com',
  projectId: 'teamwork-manager-app',
  storageBucket: 'teamwork-manager-app.appspot.com',
  messagingSenderId: '991996102934',
  appId: '1:991996102934:web:48fdbb20f938ce6b416837',
  measurementId: 'G-GH1MJL9CKR',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
// const analytics = getAnalytics(app)

export const auth: Auth = getAuth()
export const db: Firestore = getFirestore()

export const googleProvider = new GoogleAuthProvider()
