import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SlicePipe } from '@angular/common';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { NotesComponent } from './notes/notes.component';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { ConfigService } from './config.service';
import { UserService } from './user.service';
import { AddUserComponent } from './add-user/add-user.component';
import { NoteComponent } from './note/note.component';
import { ContenteditableModelDirective } from './contenteditable-model.directive';


@NgModule({
  declarations: [
    AppComponent,
    NotesComponent,
    LoginComponent,
    AddUserComponent,
    NoteComponent,
    ContenteditableModelDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule.forRoot()
  ],
  providers: [
    ConfigService,
    UserService,
    SlicePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
