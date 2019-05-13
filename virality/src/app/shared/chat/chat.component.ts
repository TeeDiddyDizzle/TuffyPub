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

    const chatId = this.route.snapshot.paramMap.get('id');
    const source = this.cs.get(chatId);
    this.chat$ = this.cs.joinUsers(source);
    this.scrollBottom(500);
  }

  submit(chatID) {
    if (!this.newMsg) {
      return alert('Message can\'t be empty');
    }
    this.cs.sendMessage(chatID, this.newMsg);
    this.newMsg = '';
    this.scrollBottom(100);
  }
  
  trackByCreated(i, msg) {
    return msg.createdAt;
  }

  private scrollBottom(delay) {
    setTimeout(() => window.scrollTo(0, document.body.scrollHeight), delay);
  }

  copy(referralURL){
    referralURL.select();
    document.execCommand('copy');
    referralURL.setSelectionRange(0, 0);
  }
}
