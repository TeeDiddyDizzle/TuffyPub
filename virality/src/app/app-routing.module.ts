import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from "./users/auth.guard";
import { ChatComponent } from "./shared/chat/chat.component";
import { DashboardModule } from "./dashboard/dashboard.module";
import { GenChatComponent } from './gen-chat/gen-chat.component';

const routes: Routes = [
  { path: '', loadChildren: './site/site.module#SiteModule' },
  { path: '', loadChildren: './users/authpages/authpages.module#AuthpagesModule' },
  { path: '', loadChildren: './dashboard/dashboard.module#DashboardModule', canActivate: [AuthGuard] },
  //{ path: 'chats/:id', component: ChatComponent, canActivate: [AuthGuard] },
  { path: 'gen-chat', component: GenChatComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
