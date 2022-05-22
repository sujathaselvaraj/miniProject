import { TestBed } from '@angular/core/testing';

import { NodeapiService } from './nodeapi.service';

describe('NodeapiService', () => {
  let service: NodeapiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NodeapiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
