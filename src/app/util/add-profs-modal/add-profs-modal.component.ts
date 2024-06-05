import {Component, inject, Input} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {NgbActiveModal, NgbPagination} from "@ng-bootstrap/ng-bootstrap";
import {ProfesorRow} from "../../interfaces/profesor";
import {ProfesorService} from "../../services/profesor.service";

@Component({
  selector: 'app-add-profs-modal',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    NgIf,
    NgbPagination,
    NgClass
  ],
  templateUrl: './add-profs-modal.component.html',
  styleUrl: './add-profs-modal.component.css'
})
export class AddProfsModalComponent {
  activeModal = inject(NgbActiveModal);
  profesores:ProfesorRow[]=[];
  @Input() added:ProfesorRow[]=[];
  selected:ProfesorRow[]=[];
  page:number= 1;
  pageSize:number=10;
  collectionSize:number=0;
  searchTerm:string="";
  sortColumn= '';
  sortDirection= '';
  constructor(private profesorService: ProfesorService) {
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
  }
  pageChanged(){
    this.profesorService.buscarNotBlocked(this.searchTerm,this.page,this.pageSize,this.sortColumn,this.sortDirection).subscribe({
      next: (data) => {
        this.profesores = (data.content as ProfesorRow[])
        this.page=data.pageable.pageNumber+1
        this.collectionSize=data.totalElements
      },
      error: (error) => {
        alert(error);
      }
    })
  }
  toggleSelection(profesor: ProfesorRow): void {
    if (!this.isSelected(profesor.id)) {
        this.selected.push(profesor);
      } else {
      const index = this.selected.indexOf(profesor);
      this.selected.splice(index, 1);
      }
  }
  isSelected(id:number): boolean {
    return this.selected.some(p => p.id === id);
  }
  isAdded(id:number): boolean {
    return this.added.some(p => p.id === id);
  }
  guardar(){
    this.activeModal.close(this.selected.map(p=>p.id))
  }
}
