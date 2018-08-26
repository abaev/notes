import {Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { DeleteAccConfirmService } from '../delete-acc-confirm.service';

@Component({
  selector: 'app-delete-account-modal',
  templateUrl: './delete-account-modal.component.html',
  styleUrls: ['./delete-account-modal.component.css']
})
export class DeleteAccountModalComponent {
	
  constructor(public activeModal: NgbActiveModal,
  	private deleteAccConfirmService: DeleteAccConfirmService) {}

  delAccount() {
  	this.deleteAccConfirmService.confirmDeleting();
  }

}
