import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceIndetail } from './device-indetail';

describe('DeviceIndetail', () => {
  let component: DeviceIndetail;
  let fixture: ComponentFixture<DeviceIndetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeviceIndetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeviceIndetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
