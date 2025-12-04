import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginSuccessPage } from './login-success-page';

describe('LoginSuccessPage', () => {
  let component: LoginSuccessPage;
  let fixture: ComponentFixture<LoginSuccessPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginSuccessPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginSuccessPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
