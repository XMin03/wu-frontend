import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuariosProfesorComponent } from './usuarios-profesor.component';

describe('UsuariosProfesorComponent', () => {
  let component: UsuariosProfesorComponent;
  let fixture: ComponentFixture<UsuariosProfesorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsuariosProfesorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsuariosProfesorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
