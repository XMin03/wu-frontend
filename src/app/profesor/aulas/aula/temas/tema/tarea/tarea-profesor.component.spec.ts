import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TareaProfesorComponent } from './tarea-profesor.component';

describe('TareaComponent', () => {
  let component: TareaProfesorComponent;
  let fixture: ComponentFixture<TareaProfesorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TareaProfesorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TareaProfesorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
