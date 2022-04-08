import { TestBed } from '@angular/core/testing';

import { MyDataSourceService } from './my-data-source.service';

describe('MyDataSourceService', () => {
  let service: MyDataSourceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyDataSourceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
