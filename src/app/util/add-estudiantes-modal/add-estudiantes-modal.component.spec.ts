import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEstudiantesModalComponent } from './add-estudiantes-modal.component';

describe('AddEstudiantesModalComponent', () => {
  let component: AddEstudiantesModalComponent;
  let fixture: ComponentFixture<AddEstudiantesModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEstudiantesModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddEstudiantesModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
