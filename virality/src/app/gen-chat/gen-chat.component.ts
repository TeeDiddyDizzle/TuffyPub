import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
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

  uid:string;
  name:string;
  content:string;

  constructor(
    private auth: AuthService, 
    private afs: AngularFirestore,
    ) { }

  ngOnInit() {
    this.postsCol = this.afs.collection('globalChat');
    this.posts = this.postsCol.valueChanges();
    this.auth.user$.subscribe(user=>{
      if(user)
        this.name = user.displayName;
        this.uid = user.uid;
    })
    //this.user = this.auth.user$;
    //const uid = this.auth.getUser();
    //this.uName = this.user.uid;
  }

  addPost() {
    //console.log(this.user);
    this.afs.collection('globalChat').add({'name': this.name, 'content': this.content});
    //update single chat message using uid and set
    //this.afs.collection('globalChat').doc(this.uid).set({'name': this.name, 'content': this.content});
  }
}
