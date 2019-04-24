import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from "./users/auth.guard";

const routes: Routes = [
  { path: '', loadChildren: './site/site.module#SiteModule' },
  { path: '', loadChildren: './users/authpages/authpages.module#AuthpagesModule' },
  { path: '', loadChildren: './dashboard/dashboard.module#DashboardModule', canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
