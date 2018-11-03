import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { SwPush } from '@angular/service-worker';
import { Observable, throwError, of } from 'rxjs';
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

  	this.swPush.subscription.pipe(take(1)).subscribe(pushSubscription => {

			if(!pushSubscription) return;

			// Check that pushSubscription correct
			this.getSubscriptions().subscribe(subs => {

				if( subs.some(s => s.endpoint === pushSubscription.endpoint) ) {
					this.isPushSubscription = true;
				} else {
					// There are no such subscription on app server,
					// it mean that pushSubscription is no longer valid,
					// so we unsubscribe from it
					pushSubscription.unsubscribe().catch(err => {	
						this.subscriptionError
            	.emit('Error. Something wrong with Push Notifications');
            });
				}
			}, error => { 
				this.subscriptionError.emit(error);
			});
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
					// this.isPushSubscription = true;
		  		this.subscriptionError
		  			.emit('Error occured while unsubscribing from push notification');
		  	});
  		});
  }


  private getSubscriptions(): Observable<any> {
  	return this.userService.getSubscriptions();

  	// return this.userService.getSubscriptions().subscribe(res => {
  	// 	return of(res.subscriptions);
  	// }, error => { 
  	// 	return throwError(error);
  	// });
  }
}
