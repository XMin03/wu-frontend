import {Component, EventEmitter, inject, Output} from '@angular/core';
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {EstudianteRow} from "../../../interfaces/estudiante";
import {EstudianteService} from "../../../services/estudiante.service";
import {FormsModule} from "@angular/forms";
import {NgbModal, NgbPagination} from "@ng-bootstrap/ng-bootstrap";
import {ModalComponent} from "../../../util/modal/modal.component";
import {Option} from "../../../interfaces/option";
import {RouterLink} from "@angular/router";
@Component({
  selector: 'app-estudiante-admin',
  standalone: true,
  imports: [
    NgForOf,
    FormsModule,
    NgIf,
    NgbPagination,
    NgClass,
    RouterLink
  ],
  templateUrl: './estudiante-admin.component.html',
  styleUrl: './estudiante-admin.component.css'
})
export class EstudianteAdminComponent {
  private modalService = inject(NgbModal);
  estudiantes:EstudianteRow[]=[];
  page= 1;
  pageSize:number=10;
  searchTerm:string="";
  @Output() bloquearODesbloquear = new EventEmitter<EstudianteRow>();
  collectionSize:number=0;

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
  }
  pageChanged(){
    this.estudianteService.buscarEstudiante(this.searchTerm,this.page,this.pageSize,this.sortColumn,this.sortDirection).subscribe({
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
  cambiarEstado(estudiante:EstudianteRow){
    this.bloquearODesbloquear.emit(estudiante);
  }
  eliminarEstudiante(id: number) {
    this.estudianteService.deleteEstudiante(id).subscribe({
      next: () => {
        this.pageChanged()
      },
      error: (error) => {
        alert(error);
      }
    });
  }
  openModal(option:EstudianteRow) {
    const modalRef = this.modalService.open(ModalComponent);
    modalRef.componentInstance.name = 'estudiante';
    modalRef.componentInstance.option = {id:option.id,nombre:option.nombre+" "+option.apellidos};
    modalRef.closed.subscribe((o: Option) => {
      this.eliminarEstudiante(o.id)
    });
  }
}
