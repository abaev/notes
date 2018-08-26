import { TestBed, inject } from '@angular/core/testing';

import { DeleteAccConfirmService } from './delete-acc-confirm.service';

describe('DeleteAccConfirmService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DeleteAccConfirmService]
    });
  });

  it('should be created', inject([DeleteAccConfirmService], (service: DeleteAccConfirmService) => {
    expect(service).toBeTruthy();
  }));
});
