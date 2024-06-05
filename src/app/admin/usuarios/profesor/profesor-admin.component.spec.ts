import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfesorAdminComponent } from './profesor-admin.component';

describe('ProfesorComponent', () => {
  let component: ProfesorAdminComponent;
  let fixture: ComponentFixture<ProfesorAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfesorAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfesorAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
