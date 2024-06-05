import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuariosEstudianteComponent } from './usuarios-estudiante.component';

describe('UsuariosProfesorComponent', () => {
  let component: UsuariosEstudianteComponent;
  let fixture: ComponentFixture<UsuariosEstudianteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsuariosEstudianteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsuariosEstudianteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
