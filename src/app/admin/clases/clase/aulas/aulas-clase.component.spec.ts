import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AulasClaseComponent } from './aulas-clase.component';

describe('AulasComponent', () => {
  let component: AulasClaseComponent;
  let fixture: ComponentFixture<AulasClaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AulasClaseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AulasClaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
