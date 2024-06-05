import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfesoresClaseComponent } from './profesores-clase.component';

describe('ProfesorComponent', () => {
  let component: ProfesoresClaseComponent;
  let fixture: ComponentFixture<ProfesoresClaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfesoresClaseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfesoresClaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
