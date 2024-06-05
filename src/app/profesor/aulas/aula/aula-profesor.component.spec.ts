import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AulaProfesorComponent } from './aula-profesor.component';

describe('AulaComponent', () => {
  let component: AulaProfesorComponent;
  let fixture: ComponentFixture<AulaProfesorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AulaProfesorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AulaProfesorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
