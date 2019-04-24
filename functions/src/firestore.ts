import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
//import { user } from 'firebase-functions/lib/providers/auth';

admin.initializeApp();
const db = admin.firestore();

export const creditReferral = functions.firestore.document('users/{uid}').onCreate(async (snapshot, context) => {
    const data = snapshot.data();

    if (data) {
        const userRef = db.doc('users/' + data.referredBy);
        var creditUserSnap = await userRef.get();
        var userData = creditUserSnap.data();
        if (userData) {
            return userRef.update({
                numReferred: userData.numReferred + 1,
                referrals: admin.firestore.FieldValue.arrayUnion(data.uid)
            });
        }
    };
    return null;
});