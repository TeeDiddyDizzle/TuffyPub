import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Observable, combineLatest, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { firestore } from 'firebase/app';
import { AuthService } from '../../users/auth.service';
import * as firebase from 'firebase/app';

import { async } from 'q';

interface Document {
  uid,
  cid: string,
  chatName: string,
  password: string,
  createdAt: number,
  count: 0,
  messages: []
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  doc: AngularFirestoreDocument<Document>;
  obsDoc: Observable<Document>;

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
          // .collection('chats', ref => ref.where('uid', '==', user.uid ))
          .collection('chats', ref => ref.where('count', '==', 0 ))
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
      cid: '',
      chatName: '',
      password: '',
      createdAt: Date.now(),
      count: 0,
      messages: []
    };
    const docRef = await this.afs.collection('chats').add(data);
    const ref = this.afs.collection('chats').doc(docRef.id);
    ref.update({
      chatName: docRef.id,
      cid: docRef.id
    });
    return this.router.navigate(['dashboard/chats',docRef.id]);
  }

  async sendMessage(chatID, content) {
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

  async updateChat(chatID, newName) {
    const { uid } = await this.auth.getUser();
    if ( uid ) {
      const ref = this.afs.collection('chats').doc(chatID);
      return ref.update({
        chatName: newName
      });
    }
  }



  async updatePass(chatID, pass) {
    const { uid } = await this.auth.getUser();
    if ( uid ) {
      const ref = this.afs.collection('chats').doc(chatID);
      return ref.update({
        password: pass
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

