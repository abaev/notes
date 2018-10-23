import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { SwPush } from '@angular/service-worker';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { DeviceDetectorService } from 'ngx-device-detector';

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
  	private userService: UserService,
  	private deviceService: DeviceDetectorService) { }
  
  pushIsEnabled: boolean;
  isPushSubscription: boolean;
  isSafari: boolean;
  
  @Output() subscriptionError: EventEmitter<any> = new EventEmitter();

  ngOnInit() {
  	this.isSafari = /safari/i.test(this.deviceService.browser);
  	this.pushIsEnabled = this.swPush.isEnabled && !this.isSafari;

  	this.isPushSubscription = false;
  	
  	this.swPush.subscription.subscribe(pushSubscription => {
			this.isPushSubscription = !!pushSubscription;
		});
  }

  
  onChange($event: any): void {
  	if($event) {
  		this.subscribeToPush();
  	} else {
  		this.unsubscribeFromPush();
  	}
  }


  private subscribeToPush() {
    // Requesting messaging service to subscribe current client (browser)
    this.swPush.requestSubscription({
      serverPublicKey: this.conf.vapidPublicKey
    })
      .then(pushSubscription => {
      		// Passing subscription object to app server
      	this.userService.sendSubscription(pushSubscription)
      		.subscribe(res => {}, error => { 
		  		this.subscriptionError
		  			.emit('Error occured while subscribing to push notifications');
		  	});
      })
      .catch(err => {
	  		this.subscriptionError
	  			.emit('Error occured while subscribing to push notifications');
      });
  }


  private unsubscribeFromPush() {
  	this.swPush.subscription.pipe(take(1)).subscribe(pushSubscription => {
  		if(!pushSubscription) {
  			this.subscriptionError
      		.emit('Error occured while unsubscribing from push notification');
      		return;
  		}

			this.userService.deleteSubscription(pushSubscription.endpoint)
				.subscribe(() => {
					pushSubscription.unsubscribe()
            .then(() => {
              // this.isPushSubscription = false;
            })
            .catch(err => {
              // this.subscriptionError
            	// this.isPushSubscription = true;
            	this.subscriptionError
            		.emit('Error occured while unsubscribing from push notification');
            });
				},
				error => { 
					console.log('Server error');
					// this.isPushSubscription = true;
		  		this.subscriptionError
		  			.emit('Error occured while unsubscribing from push notification');
		  	});
  		});
  }
}
