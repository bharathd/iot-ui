import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserWelcomePage } from './user-welcome-page';

describe('UserWelcomePage', () => {
  let component: UserWelcomePage;
  let fixture: ComponentFixture<UserWelcomePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserWelcomePage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserWelcomePage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
