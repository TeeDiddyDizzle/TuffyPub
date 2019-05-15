import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, sortedChanges } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AuthService } from '../../users/auth.service';

interface Post {
  name: string;
  content: string;
  createdAt: number;
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
  styleUrls: ['./gen-chat.component.scss','../../shared/chat/chat.component.scss']
})
export class GenChatComponent implements OnInit {
  user: Observable<User>;
  postsCol: AngularFirestoreCollection<Post>;
  posts: Observable<Post[]>;

  uid:string;
  name:string;
  content:string;
  createdAt:number;

  constructor(
    private auth: AuthService, 
    private afs: AngularFirestore,
    ) { }

  ngOnInit() {
    this.postsCol = this.afs.collection('globalChat', ref => ref.orderBy('createdAt'));
    this.posts = this.postsCol.valueChanges();
    this.auth.user$.subscribe(user=>{
      if(user)
        this.name = user.displayName;
        this.uid = user.uid;
    })
    this.scrollBottom(500);
  }

  sort() {
    console.log(this.posts);
  }

  trackByCreated() {
    return this.createdAt;
  }

  scrollBottom(delay) {
    setTimeout(() => window.scrollTo(0, document.body.scrollHeight), delay);
  }

  addPost() {
    if (!this.content) {
      return alert('Message can\'t be empty');
    }
    //console.log(this.user);
    this.createdAt = Date.now();
    //update single chat message using uid and set
    this.afs.collection('globalChat').add({'name': this.name, 'uid': this.uid, 'content': this.content, 'createdAt': this.createdAt});
    this.content='';
    this.scrollBottom(100);
  }
}
