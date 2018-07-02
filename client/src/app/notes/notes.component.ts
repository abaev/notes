import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Router }  from '@angular/router';

import { User } from '../user';
import { ConfigService } from '../config.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {

	user: User;

  constructor(private userService: UserService,
  	private conf: ConfigService) { }

  ngOnInit() {
  	this.getNotes();
  }

  private getNotes(): void {
  	this.userService.getNotes().subscribe(res => {
  		this.user = res;
  	});
  }

}
