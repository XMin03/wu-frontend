import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TareaEstudianteComponent } from './tarea-estudiante.component';

describe('TareaComponent', () => {
  let component: TareaEstudianteComponent;
  let fixture: ComponentFixture<TareaEstudianteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TareaEstudianteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TareaEstudianteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
