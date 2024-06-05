import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProfsModalComponent } from './add-profs-modal.component';

describe('AddProfsModalComponent', () => {
  let component: AddProfsModalComponent;
  let fixture: ComponentFixture<AddProfsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddProfsModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddProfsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
