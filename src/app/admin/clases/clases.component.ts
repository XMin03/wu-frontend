import {Component, inject} from '@angular/core';
import {ClaseService} from "../../services/clase.service";
import {NgForOf} from "@angular/common";
import {CursoService} from "../../services/curso.service";
import {AsignaturaService} from "../../services/asignatura.service";
import {FormsModule} from "@angular/forms";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {Option} from "../../interfaces/option";
import {ModalComponent} from "../../util/modal/modal.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-clases',
  standalone: true,
  imports: [
    NgForOf,
    FormsModule,
    RouterLink
  ],
  templateUrl: './clases.component.html',
  styleUrl: './clases.component.css'
})
export class ClasesComponent {
  private modalService = inject(NgbModal);
  clases:Option[]=[];
  cursos:Option[]=[];
  asignaturas:Option[]=[];
  cursoSeleccionado:number=-1;
  asignaturaSeleccionado:number=-1;

  constructor(private claseService: ClaseService,
              private cursoService:CursoService,
              private asignaturaService:AsignaturaService,
              private route:ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this.asignaturaSeleccionado = params['asignaturaId']|| -1;
      this.cursoSeleccionado = params['cursoId']|| -1;
    });
    this.claseService.filterClase(this.cursoSeleccionado,this.asignaturaSeleccionado).subscribe({
      next: (data) => {
        this.clases = (data)
        this.cursoService.getCursos().subscribe(cursos=>this.cursos = cursos);
        this.asignaturaService.getAsignaturas().subscribe(asignaturas=>this.asignaturas = asignaturas);
      },
      error: (error) => {
        alert(error);
      }
    });
  }
  openModal(option:Option) {
    const modalRef = this.modalService.open(ModalComponent);
    modalRef.componentInstance.name = 'clase';
    modalRef.componentInstance.option = option;
    modalRef.closed.subscribe((o: Option) => {
      this.eliminarClase(o.id)
    });
  }
  filtrarClases(){
    this.claseService.filterClase(this.cursoSeleccionado,this.asignaturaSeleccionado).subscribe({
      next: (data) => {
        this.clases = data
      },
      error: (error) => {
        alert(error);
      }
    });
  }
  crearClase(){
    this.claseService.crearClase(this.cursoSeleccionado,this.asignaturaSeleccionado).subscribe({
      next: (data) => {
        this.clases.push(data)
      },
      error: (error) => {
        alert(error);
      }
    });
  }
  eliminarClase(id:number){
    this.claseService.deleteClase(id).subscribe({
      next: () => {
        this.clases=this.clases.filter(c=>c.id!=id)
      },
      error: (error) => {
        alert(error);
      }
    });
  }
}

