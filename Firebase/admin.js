var admin = require("firebase-admin")

var serviceAccount = require("./keys.json")

!admin.apps.length &&
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
    })

export const firestore = admin.firestore()
