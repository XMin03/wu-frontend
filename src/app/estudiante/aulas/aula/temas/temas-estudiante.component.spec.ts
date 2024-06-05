import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemasEstudianteComponent } from './temas-estudiante.component';

describe('TemasComponent', () => {
  let component: TemasEstudianteComponent;
  let fixture: ComponentFixture<TemasEstudianteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TemasEstudianteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TemasEstudianteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
