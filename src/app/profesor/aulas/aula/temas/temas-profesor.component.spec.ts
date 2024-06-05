import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemasProfesorComponent } from './temas-profesor.component';

describe('TemasComponent', () => {
  let component: TemasProfesorComponent;
  let fixture: ComponentFixture<TemasProfesorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TemasProfesorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TemasProfesorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
