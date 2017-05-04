import { TestBed, inject } from '@angular/core/testing';

import { MakeService } from './make.service';

describe('MakeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MakeService]
    });
  });

  it('should ...', inject([MakeService], (service: MakeService) => {
    expect(service).toBeTruthy();
  }));
});
