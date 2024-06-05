import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FasesProfesorComponent } from './fases-profesor.component';

describe('FasesComponent', () => {
  let component: FasesProfesorComponent;
  let fixture: ComponentFixture<FasesProfesorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FasesProfesorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FasesProfesorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
