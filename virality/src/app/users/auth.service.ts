import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

import { Observable, of } from 'rxjs';
import { switchMap, first } from 'rxjs/operators';

interface User {
  uid?: string;
  email: string;
  photoURL?: string;
  displayName?: string;
  referralURL?: string;
  referredBy?: string;
  referrals: Array<string>;
  numReferred: number;
  creationDate: number;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<User>;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
  ) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        // Logged in
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          // Logged out
          return of(null);
        }
      })
    )
  }

  isLoggedIn() {
    return this.afAuth.authState.pipe(first());
  }

  loginUser(email: string, password: string): Promise<auth.UserCredential> {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  signupUser(email: string, password: string, referral?: string): Promise<any> {
    const user: User = {
      email: email,
      creationDate: Date.now(),
      referrals: [],
      numReferred: 0
    }

    if (referral !== 'undefined') {
      user.referredBy = referral
    }
    return this.afAuth.auth
      .createUserWithEmailAndPassword(email, password)
      .then((newUserCredential: auth.UserCredential) => {
        user.uid = newUserCredential.user.uid;
        user.referralURL = "https://virality-d6e74.firebaseapp.com/referral/" + user.uid
        this.afs.doc(`/users/${newUserCredential.user.uid}`)
          .set(Object.assign({}, user), { merge: true });
      })
      .catch(error => {
        console.error(error);
        throw new Error(error);
      });
  }

  resetPassword(email: string): Promise<void> {
    return this.afAuth.auth.sendPasswordResetEmail(email);
  }

  async googleSignIn(referral?: string) {
    const provider = new auth.GoogleAuthProvider();
    const credential = await this.afAuth.auth.signInWithPopup(provider);
    return this.updateUserData(credential.user, referral);
  }

  async facebookSignIn(referral?: string) {
    const provider = new auth.FacebookAuthProvider();
    const credential = await this.afAuth.auth.signInWithPopup(provider);
    return this.updateUserData(credential.user, referral)
  }


  private updateUserData(user, referral?: string) {
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);

    const data = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      referralURL: "https://virality-d6e74.firebaseapp.com/referral/" + user.uid,
      numReferred: 0,
      referrals: [],
      referredBy: "",
      creationDate: Date.now()
    }

    if (referral !== undefined) {
      data.referredBy = referral;
    }
    this.router.navigate(['/dashboard']);
    return userRef.set(data, { merge: true })

  }

  async signOut() {
    await this.afAuth.auth.signOut();
    this.router.navigate(['/']);
  }

}
