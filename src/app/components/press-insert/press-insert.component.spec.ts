import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PressInsertComponent } from './press-insert.component';

describe('PressInsertComponent', () => {
  let component: PressInsertComponent;
  let fixture: ComponentFixture<PressInsertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PressInsertComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PressInsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
