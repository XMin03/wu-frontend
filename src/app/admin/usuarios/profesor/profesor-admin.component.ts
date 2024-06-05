import {Component, EventEmitter, inject, Output} from '@angular/core';
import {NgClass, NgFor, NgIf} from "@angular/common";
import {ProfesorService} from "../../../services/profesor.service";
import {ProfesorRow} from "../../../interfaces/profesor";
import {NgbModal, NgbPaginationModule} from "@ng-bootstrap/ng-bootstrap";
import {FormsModule} from "@angular/forms";
import {Option} from "../../../interfaces/option";
import {ModalComponent} from "../../../util/modal/modal.component";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-profesor-admin',
  standalone: true,
  imports: [NgFor, NgIf, NgbPaginationModule, NgClass, FormsModule, RouterLink,
  ],
  templateUrl: './profesor-admin.component.html',
  styleUrl: './profesor-admin.component.css'
})
export class ProfesorAdminComponent {
  private modalService = inject(NgbModal);
  profesores:ProfesorRow[]=[];
  page:number= 1;
  pageSize:number=10;
  searchTerm:string="";
  @Output() bloquearODesbloquear = new EventEmitter<ProfesorRow>();
  collectionSize:number=0;

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
    this.profesorService.buscarProfesor(this.searchTerm,this.page,this.pageSize,this.sortColumn,this.sortDirection).subscribe({
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
  cambiarEstado(profesor:ProfesorRow){
    this.bloquearODesbloquear.emit(profesor);
  }
  eliminarProfesor(id: number) {
    this.profesorService.deleteProfesor(id).subscribe({
      next: () => {
        this.pageChanged()
      },
      error: (error) => {
        alert(error);
      }
    });
  }
  openModal(option:ProfesorRow) {
    const modalRef = this.modalService.open(ModalComponent);
    modalRef.componentInstance.name = 'profesor';
    modalRef.componentInstance.option = {id: option.id, nombre: option.nombre + " " + option.apellidos};
    modalRef.closed.subscribe((o: Option) => {
      this.eliminarProfesor(o.id)
    });
  }
}
