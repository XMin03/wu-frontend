import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportTareasComponent } from './import-tareas.component';

describe('ImportTareasComponent', () => {
  let component: ImportTareasComponent;
  let fixture: ComponentFixture<ImportTareasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImportTareasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ImportTareasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
