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

  getUser() {
    return this.user$.pipe(first()).toPromise();
  }

  isLoggedIn() {
    return this.afAuth.authState.pipe(first());
  }

  loginUser(email: string, password: string): Promise<auth.UserCredential> {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .catch(error => {
        alert(error.message);
        throw new Error(error);
      });
  }

  signupUser(displayName: string, email: string, password: string): Promise<any> {
    const user: User = {
      displayName: displayName,
      email: email,
      creationDate: Date.now()
    }

    return this.afAuth.auth
      .createUserWithEmailAndPassword(email, password)
      .then((newUserCredential: auth.UserCredential) => {
        user.uid = newUserCredential.user.uid;
        this.afs.doc(`/users/${newUserCredential.user.uid}`)
          .set(Object.assign({}, user), { merge: true });
      })
      .catch(error => {
        alert(error.message);
        throw new Error(error);
      });
  }

  resetPassword(email: string): Promise<void> {
    return this.afAuth.auth.sendPasswordResetEmail(email)
      .catch(error => {
        alert(error.message);
        throw new Error(error);
      });
  }

  private updateUserData(user) {
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);

    const data = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      creationDate: Date.now()
    }

    this.router.navigate(['/dashboard']);
    return userRef.set(data, { merge: true })

  }

  async signOut() {
    await this.afAuth.auth.signOut();
    this.router.navigate(['/']);
  }

}
