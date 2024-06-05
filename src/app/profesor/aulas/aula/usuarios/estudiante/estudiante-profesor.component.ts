import {Component, inject} from '@angular/core';
import {NgClass, NgFor, NgIf} from "@angular/common";
import {NgbModal, NgbPaginationModule} from "@ng-bootstrap/ng-bootstrap";
import {FormsModule} from "@angular/forms";
import {Option} from "../../../../../interfaces/option";
import {ModalComponent} from "../../../../../util/modal/modal.component";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {AulaService} from "../../../../../services/aula.service";
import {EstudianteRow} from "../../../../../interfaces/estudiante";
import {AddEstudiantesModalComponent} from "../../../../../util/add-estudiantes-modal/add-estudiantes-modal.component";

@Component({
  selector: 'app-estudiante-profesor',
  standalone: true,
  imports: [NgFor, NgIf, NgbPaginationModule, NgClass, FormsModule, RouterLink,
  ],
  templateUrl: './estudiante-profesor.component.html',
  styleUrl: './estudiante-profesor.component.css'
})
export class EstudianteProfesorComponent {
  private modalService = inject(NgbModal);
  estudiantes:EstudianteRow[]=[];
  searchTerm:string="";
  sortColumn= '';
  sortDirection= '';
  id:number=0
  constructor(private aulaService:AulaService,private route:ActivatedRoute) {
    this.route.parent?.params.subscribe(p => {
      this.id = Number(p['id'])||0;
      this.getEstudiantes();
    })
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
    this.sort()
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
  getEstudiantes(){
    this.aulaService.getEstudiantes(this.id,this.searchTerm).subscribe({
      next: (data) => {
        this.estudiantes = data
        this.sort()
      },
      error: (error) => {
        alert(error);
      }
    })
  }
  abrirModalAnadir(){
    const modalRef = this.modalService.open(AddEstudiantesModalComponent,{size: 'xl',centered: true, scrollable: true});
    this.aulaService.getEstudiantes(this.id,"").subscribe({
      next: (data) => {
        modalRef.componentInstance.added=data;
      },
      error: (error) => {
        alert(error);
      }
    })
    modalRef.closed.subscribe((ids: number[]) => {
      this.aniadirEstudiante(ids)
    });
  }
  aniadirEstudiante(ids:number[]){
    this.aulaService.addEst(this.id,ids).subscribe({
      next: (data) => {
        this.estudiantes.push(...data)
      },
      error: (error) => {
        alert(error);
      }
    })
  }

  eliminarEstudiante(id: number) {
    this.aulaService.removeEstudiante(this.id,id).subscribe({
      next: () => {
        this.estudiantes = this.estudiantes.filter(p => p.id != id)
      },
      error: (error) => {
        alert(error);
      }
    });
  }
  openModal(option:EstudianteRow) {
    const modalRef = this.modalService.open(ModalComponent);
    modalRef.componentInstance.name = 'estudiante';
    modalRef.componentInstance.option = {id: option.id, nombre: option.nombre + " " + option.apellidos};
    modalRef.closed.subscribe((o: Option) => {
      this.eliminarEstudiante(o.id)
    });
  }
}
