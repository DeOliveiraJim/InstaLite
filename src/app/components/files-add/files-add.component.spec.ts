import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilesAddComponent } from './files-add.component';

describe('FilesAddComponent', () => {
  let component: FilesAddComponent;
  let fixture: ComponentFixture<FilesAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FilesAddComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FilesAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
