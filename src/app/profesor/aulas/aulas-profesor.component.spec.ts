import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AulasProfesorComponent } from './aulas-profesor.component';

describe('ListAulasComponent', () => {
  let component: AulasProfesorComponent;
  let fixture: ComponentFixture<AulasProfesorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AulasProfesorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AulasProfesorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
