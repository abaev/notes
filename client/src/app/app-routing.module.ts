import { NgModule }              from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';

import { NotesComponent } from './notes/notes.component';
import { LoginComponent } from './login/login.component';

const appRoutes: Routes = [
  { path: 'notes', component: NotesComponent },
  { path: 'login', component: LoginComponent },
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
