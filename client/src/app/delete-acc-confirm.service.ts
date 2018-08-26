import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DeleteAccConfirmService {

  private deleteAccountConfirmed = new Subject();

	deleteConfirmed$ = this.deleteAccountConfirmed.asObservable();

	confirmDeleting() {
		this.deleteAccountConfirmed.next();
	}


}
