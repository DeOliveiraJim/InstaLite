import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDisconnectComponent } from './user-disconnect.component';

describe('UserDisconnectComponent', () => {
  let component: UserDisconnectComponent;
  let fixture: ComponentFixture<UserDisconnectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserDisconnectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserDisconnectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
