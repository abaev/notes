import { NgModule }              from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';

import { NotesComponent } from './notes/notes.component';
import { LoginComponent } from './login/login.component';
import { AddUserComponent } from './add-user/add-user.component';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'notes', component: NotesComponent },
  { path: 'adduser', component: AddUserComponent },
  { path: '', redirectTo: '/notes', pathMatch: 'full' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
