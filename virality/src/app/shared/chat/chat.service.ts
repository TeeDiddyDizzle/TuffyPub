import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Observable, combineLatest, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { firestore } from 'firebase/app';
import { AuthService } from '../../users/auth.service';

import { async } from 'q';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(
    private auth: AuthService, 
    private afs: AngularFirestore,
    private router: Router
    ) {}

  get(chatID) {
    return this.afs
      .collection<any>('chats')
      .doc(chatID)
      .snapshotChanges()
      .pipe(
        map(doc => {
          return { id: doc.payload.id, ...doc.payload.data() };
        })
      );
  }
  
  getUserChats() {
    return this.auth.user$.pipe(
      switchMap(user => {
        return this.afs
          .collection('chats', ref => ref.where('uid', '==', user.uid))
          .snapshotChanges()
          .pipe(
            map(actions => {
              return actions.map(a => {
                const data: Object = a.payload.doc.data();
                const id = a.payload.doc.id;
                return { id, ...data };
              });
            })
          );
      })
    );
  }
  
  async create() {
    const { uid } = await this.auth.getUser();

    const data = {
      uid,
      createdAt: Date.now(),
      count: 0,
      messages: []
    };
    const docRef = await this.afs.collection('chats').add(data);
    return this.router.navigate(['chats',docRef.id]);
  }

  async sendMessage(chatID, content) {
    // this.afs.collection('posts').add({'userName': this.userName, 'content': this.content});
    const { uid } = await this.auth.getUser();
    const data = {
      uid,
      content,
      createdAt: Date.now()
    };

    if ( uid ) {
      const ref = this.afs.collection('chats').doc(chatID);
      return ref.update({
        messages: firestore.FieldValue.arrayUnion(data)
      });
    }
  }

  joinUsers(chat$: Observable<any>) {
    let chat;
    const joinKeys = {};
    return chat$.pipe(
      switchMap( c => {
        chat = c;
        const uids = Array.from(new Set(c.messages.map( v => v.uid)));
        const userDocs = uids.map(u => 
          this.afs.doc(`users/${u}`).valueChanges()
        );
        return userDocs.length ? combineLatest(userDocs) : of([]);
      }),
      map(arr => {
        arr.forEach(v => (joinKeys[(<any>v).uid] = v));
        chat.messages = chat.messages.map(v => {
          return { ...v, user: joinKeys[v.uid] };
        });
        return chat;
      })
    );
  }
}

