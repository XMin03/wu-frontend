import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstudianteProfesorComponent } from './estudiante-profesor.component';

describe('EstudianteComponent', () => {
  let component: EstudianteProfesorComponent;
  let fixture: ComponentFixture<EstudianteProfesorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EstudianteProfesorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EstudianteProfesorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
