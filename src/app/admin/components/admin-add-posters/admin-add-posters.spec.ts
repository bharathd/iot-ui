import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddPosters } from './admin-add-posters';

describe('AdminAddPosters', () => {
  let component: AdminAddPosters;
  let fixture: ComponentFixture<AdminAddPosters>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminAddPosters]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminAddPosters);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
