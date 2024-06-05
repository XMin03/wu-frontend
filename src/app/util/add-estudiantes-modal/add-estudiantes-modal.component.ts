import {Component, inject, Input} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {NgbActiveModal, NgbPagination} from "@ng-bootstrap/ng-bootstrap";
import {EstudianteRow} from "../../interfaces/estudiante";
import {EstudianteService} from "../../services/estudiante.service";

@Component({
  selector: 'app-add-estudiantes-modal',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    NgIf,
    NgbPagination,
    ReactiveFormsModule,
    NgClass
  ],
  templateUrl: './add-estudiantes-modal.component.html',
  styleUrl: './add-estudiantes-modal.component.css'
})
export class AddEstudiantesModalComponent {
  activeModal = inject(NgbActiveModal);
  estudiantes:EstudianteRow[]=[];
  @Input() added:EstudianteRow[]=[];
  selected:EstudianteRow[]=[];
  page:number= 1;
  pageSize:number=10;
  collectionSize:number=0;
  searchTerm:string="";
  sortColumn= '';
  sortDirection= '';
  constructor(private estudianteService: EstudianteService) {
    this.pageChanged()
  }
  onSort(column:string) {
    if (this.sortColumn==column)
      if (this.sortDirection=="desc")
        this.sortColumn="";
      else
        this.sortDirection = this.sortDirection =="asc"?"desc":"asc";
    else{
      this.sortColumn=column
      this.sortDirection = "asc";
    }
    this.pageChanged()
    this.sort();
  }
  sort(){
    if (!(this.sortDirection === '' || this.sortColumn === '')) {
      const compare = (a: EstudianteRow, b: EstudianteRow) => {
        const v1 = a[this.sortColumn];
        const v2 = b[this.sortColumn];
        let res = v1 < v2 ? -1 : v1 > v2 ? 1 : 0
        return this.sortDirection === 'asc' ? res : -res;
      };
      this.estudiantes.sort(compare);
    }
  }
  pageChanged(){
    this.estudianteService.buscarNotBlocked(this.searchTerm,this.page,this.pageSize,this.sortColumn,this.sortDirection).subscribe({
      next: (data) => {
        this.estudiantes = (data.content as EstudianteRow[])
        this.page=data.pageable.pageNumber+1
        this.collectionSize=data.totalElements
      },
      error: (error) => {
        alert(error);
      }
    })
  }
  toggleSelection(estudiante: EstudianteRow): void {
    if (this.isSelected(estudiante.id)) {
      this.selected.push(estudiante);
    } else {
      const index = this.selected.indexOf(estudiante);
      this.selected.splice(index, 1);
    }
  }
  isSelected(id:number): boolean {
    return this.selected.some(e => e.id === id);
  }
  isAdded(id:number): boolean {
    return this.added.some(e => e.id === id);
  }
  guardar(){
    this.activeModal.close(this.selected.map(p=>p.id))
  }
}

