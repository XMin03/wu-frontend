import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AulaEstudianteComponent } from './aula-estudiante.component';

describe('AulaComponent', () => {
  let component: AulaEstudianteComponent;
  let fixture: ComponentFixture<AulaEstudianteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AulaEstudianteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AulaEstudianteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
