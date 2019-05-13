import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { ChatService } from '../shared/chat/chat.service'
import { AuthService } from '../users/auth.service';

interface Post {
  name: string;
  content: string;
}

interface User {
  uid?: string;
  email: string;
  photoURL?: string;
  displayName?: string;
  creationDate: number;
}

@Component({
  selector: 'app-gen-chat',
  templateUrl: './gen-chat.component.html',
  styleUrls: ['./gen-chat.component.scss']
})
export class GenChatComponent implements OnInit {

  user: Observable<User>;
  postsCol: AngularFirestoreCollection<Post>;
  posts: Observable<Post[]>;

  uName:string;
  name:string;
  content:string;

  constructor(
    private auth: AuthService, 
    private afs: AngularFirestore,
    ) { }

  ngOnInit() {
    this.postsCol = this.afs.collection('globalChat');
    this.posts = this.postsCol.valueChanges();
    //this.user = this.auth.user$;
    //const uid = this.auth.getUser();
    this.name = 'myname';
    //this.uName = this.user.uid;
  }

  addPost() {
    //console.log(this.user);
    this.afs.collection('globalChat').add({'name': this.name, 'content': this.content});
  }

  currentUser() {
    const uid = this.auth.getUser();
  }
}
