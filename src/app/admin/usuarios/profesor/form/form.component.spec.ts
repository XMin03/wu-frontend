import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfesorFormComponent } from './form.component';

describe('FormComponent', () => {
  let component: ProfesorFormComponent;
  let fixture: ComponentFixture<ProfesorFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfesorFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfesorFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});