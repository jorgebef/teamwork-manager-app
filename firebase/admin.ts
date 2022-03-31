// import admin from 'firebase-admin'
import * as firebaseAdmin from 'firebase-admin'

if (!firebaseAdmin.apps.length) {
  firebaseAdmin.initializeApp(
    {
      credential: firebaseAdmin.credential.cert({
        projectId: process.env.NEXT_PUBLIC_PROJECTID,
        // Need to format the private key correctly because of dotenv
        privateKey: process.env.NEXT_PUBLIC_PRIVATE_KEY?.replace(/\\n/g, '\n'),
        clientEmail: process.env.NEXT_PUBLIC_CLIENT_EMAIL,
      }),
      databaseURL: `https://${process.env.NEXT_PUBLIC_PROJECTID}.firebaseio.com`,
    }
    // 'admin'
  )
}

export { firebaseAdmin }
