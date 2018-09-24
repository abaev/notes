import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SlicePipe } from '@angular/common';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DeviceDetectorModule } from 'ngx-device-detector';

import { AppComponent } from './app.component';
import { NotesComponent } from './notes/notes.component';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { ConfigService } from './config.service';
import { UserService } from './user.service';
import { AddUserComponent } from './add-user/add-user.component';
import { NoteComponent } from './note/note.component';
import { ContenteditableModelDirective } from './contenteditable-model.directive';
import { FooterComponent } from './footer/footer.component';
import { DeleteAccountModalComponent } from './delete-account-modal/delete-account-modal.component';
import { DeleteAccConfirmService } from './delete-acc-confirm.service';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

// DeleteAccConfirmService are used for coomunication
// between NotesComponent and DeleteAccountModalComponent only,
// so in that cases I have to declare DeleteAccConfirmService
// in parent's (NotesComponent) providers property of @Component
// decorator, but this does not working in my case, I think because 
// of DeleteAccountModalComponent - is a dynamic component.

@NgModule({
  declarations: [
    AppComponent,
    NotesComponent,
    LoginComponent,
    AddUserComponent,
    NoteComponent,
    ContenteditableModelDirective,
    FooterComponent,
    DeleteAccountModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule.forRoot(),
    DeviceDetectorModule.forRoot(),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    ConfigService,
    UserService,
    SlicePipe,
    DeleteAccConfirmService
  ],
  bootstrap: [AppComponent],
  entryComponents: [DeleteAccountModalComponent]
})
export class AppModule { }
