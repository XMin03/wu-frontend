import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FasesEstudianteComponent } from './fases-estudiante.component';

describe('FasesComponent', () => {
  let component: FasesEstudianteComponent;
  let fixture: ComponentFixture<FasesEstudianteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FasesEstudianteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FasesEstudianteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
