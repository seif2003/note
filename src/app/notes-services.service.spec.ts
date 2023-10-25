import { TestBed } from '@angular/core/testing';

import { NotesServicesService } from './notes-services.service';

describe('NotesServicesService', () => {
  let service: NotesServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotesServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
