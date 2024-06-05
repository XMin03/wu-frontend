import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfesorEstudianteComponent } from './profesor-estudiante.component';

describe('ProfesorComponent', () => {
  let component: ProfesorEstudianteComponent;
  let fixture: ComponentFixture<ProfesorEstudianteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfesorEstudianteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfesorEstudianteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
