import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AuthService } from "../../users/auth.service";
import { ChatService } from "./chat.service"
import { async } from 'q';
import { User } from 'firebase';



@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  chat$: Observable<any>;
  newMsg: string;

  constructor(
    public cs: ChatService, 
    private route: ActivatedRoute,
    public auth: AuthService
    ) {}

  ngOnInit() {
    // this.postsCol = this.afs.collection('posts');
    // this.posts = this.postsCol.valueChanges();
    const chatID = this.route.snapshot.paramMap.get('id');
    const source = this.cs.get('id5');
    // this.chat$ = this.cs.joinUsers(source);
  }

  submit(chatID) {
    if (!this.newMsg) {
      return alert('Message can\'t be empty');
    }
    this.cs.sendMessage(chatID, this.newMsg);
    this.newMsg = '';
  }
  
  trackByCreated(i, msg) {
    return msg.createdAt;
  }
}
