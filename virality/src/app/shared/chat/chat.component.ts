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
  styleUrls: ['./chat.component.scss', '../../dashboard/master/master.component.scss']
})
export class ChatComponent implements OnInit {
  userChats$;
  chat$: Observable<any>;
  newName: string;
  newMsg: string;
  newPass: string;
  pass: string;
  valid: boolean;

  constructor(
    public cs: ChatService, 
    private route: ActivatedRoute,
    public auth: AuthService
    ) {}

  ngOnInit() {
    this.pass = '';
    this.userChats$ = this.cs.getUserChats();
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
    this.scrollBottom(300);
  }
  
  trackByCreated(i, msg) {
    return msg.createdAt;
  }

  scrollBottom(delay) {
    setTimeout(() => window.scrollTo(0, document.body.scrollHeight), delay);
  }

  copy(referralURL){
    referralURL.select();
    document.execCommand('copy');
    referralURL.setSelectionRange(0, 0);
  }

  changeName(chatID) {
    if (!this.newName) {
      return;
    }
    this.cs.updateChat(chatID, this.newName);
    this.newName = '';
  }

  changePass(chatID) {
    if (!this.newPass) {
      return;
    }
    this.pass = this.newPass;
    const realPass = this.cs.updatePass(chatID, this.newPass);
  }
}
