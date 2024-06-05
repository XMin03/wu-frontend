import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AulaEditModalComponent } from './aula-edit-modal.component';

describe('AulaEditModalComponent', () => {
  let component: AulaEditModalComponent;
  let fixture: ComponentFixture<AulaEditModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AulaEditModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AulaEditModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
