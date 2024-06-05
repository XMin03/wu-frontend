import {Component, inject} from '@angular/core';
import {AulaForm} from "../../interfaces/aula";
import {Option} from "../../interfaces/option";
import {FormsModule} from "@angular/forms";
import {NgForOf} from "@angular/common";
import {RouterLink} from "@angular/router";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ModalComponent} from "../../util/modal/modal.component";
import {EstudianteService} from "../../services/estudiante.service";

@Component({
  selector: 'app-list-aulas',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    RouterLink
  ],
  templateUrl: './aulas-estudiante.component.html',
  styleUrl: './aulas-estudiante.component.css'
})
export class AulasEstudianteComponent {
  private modalService = inject(NgbModal);
  aula:AulaForm={
    id:0,
    clase:{id:-1,nombre:""},
    grupo:"",
    anio:""
  }
  aulas:Option[]=[];
  constructor(private estudianteService:EstudianteService) {
    estudianteService.getAulas().subscribe({
      next: (a) => {
        this.aulas = a
      },
      error: (error) => {
        alert(error);
      }
    })
  }
  openEliminarModal(option:Option) {
    const modalRef = this.modalService.open(ModalComponent);
    modalRef.componentInstance.name = 'aula';
    modalRef.componentInstance.option = option;
    modalRef.closed.subscribe((o: Option) => {
      this.salirAula(o.id)
    });
  }
  salirAula(id: number) {
    this.estudianteService.salirAula(id).subscribe({
      next: () => {
        this.aulas = this.aulas.filter(a => a.id != id)
      },
      error: (error) => {
        alert("No se ha podido salir del aula")
        alert(error);
      }
    });
  }
}
