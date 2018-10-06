import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { SwPush } from '@angular/service-worker';
import { Observable } from 'rxjs';

import { ConfigService } from '../config.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-push-notifications',
  templateUrl: './push-notifications.component.html',
  styleUrls: ['./push-notifications.component.css']
})
export class PushNotificationsComponent implements OnInit {

  constructor(private swPush: SwPush,
  	private conf: ConfigService,
  	private userService: UserService) { }
  
  pushIsEnabled: boolean;
  isPushSubscription: boolean;
  @Output() subscriptionError: EventEmitter<any> = new EventEmitter();

  ngOnInit() {
  	this.pushIsEnabled = this.swPush.isEnabled;
  	this.isPushSubscription = false;
  	
  	this.swPush.subscription.subscribe(pushSubscription => {
			this.isPushSubscription = !!pushSubscription;
			console.log(`pushSubscription = ${JSON.stringify(pushSubscription)}`);
		});
  }

  
  onChange($event: any): void {
  	console.log(`$event = ${JSON.stringify($event)}`);
  	console.log(`this.isPushSubscription = ${this.isPushSubscription}`);
  	if($event) {
  		this.subscribeToPush();
  	}
  }


  subscribeToPush() {
    // Requesting messaging service to subscribe current client (browser)
    this.swPush.requestSubscription({
      serverPublicKey: this.conf.vapidPublicKey
    })
      .then(pushSubscription => {
      	// Passing subscription object to app server
      	this.userService.sendSubscription(pushSubscription)
      		.subscribe(res => {}, error => { 
		  		this.subscriptionError.emit('Error occured while subscribing to push notifications');
		  	});
      })
      .catch(err => {
	  		this.subscriptionError.emit('Error occured while subscribing to push notifications');
      });
  }
}
