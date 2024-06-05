import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstudianteEstudianteComponent } from './estudiante-estudiante.component';

describe('EstudianteComponent', () => {
  let component: EstudianteEstudianteComponent;
  let fixture: ComponentFixture<EstudianteEstudianteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EstudianteEstudianteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EstudianteEstudianteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
