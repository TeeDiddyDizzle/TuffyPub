import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { ChatComponent } from "../shared/chat/chat.component";
import { GenChatComponent } from '../gen-chat/gen-chat.component';

import { AuthGuard } from "../users/auth.guard";

import { MasterComponent } from './master/master.component';

const routes: Routes = [
  { path: 'dashboard', component: MasterComponent },
  { path: 'dashboard/chats/:id', component: ChatComponent, canActivate: [AuthGuard] },
  //{ path: 'dashboard/gen-chat', component: GenChatComponent },

]

@NgModule({
  declarations: [MasterComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class DashboardModule { }
