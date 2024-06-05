import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemaProfesorComponent } from './tema-profesor.component';

describe('TemaComponent', () => {
  let component: TemaProfesorComponent;
  let fixture: ComponentFixture<TemaProfesorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TemaProfesorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TemaProfesorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
