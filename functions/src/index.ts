import * as functions from 'firebase-functions';

const universal = require(`../dist/server`).app;

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

export const ssr = functions.https.onRequest(universal);

export { creditReferral } from './firestore'
