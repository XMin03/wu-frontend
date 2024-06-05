import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfesorProfesorComponent } from './profesor-profesor.component';

describe('ProfesorComponent', () => {
  let component: ProfesorProfesorComponent;
  let fixture: ComponentFixture<ProfesorProfesorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfesorProfesorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfesorProfesorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
