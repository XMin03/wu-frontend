import {Component, inject} from '@angular/core';
import {Aula, AulaForm} from "../../interfaces/aula";
import {Option} from "../../interfaces/option";
import {ProfesorService} from "../../services/profesor.service";
import {AulaService} from "../../services/aula.service";
import {FormsModule} from "@angular/forms";
import {NgForOf} from "@angular/common";
import {RouterLink} from "@angular/router";
import {AulaEditModalComponent} from "./aula-edit-modal/aula-edit-modal.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ModalComponent} from "../../util/modal/modal.component";

@Component({
  selector: 'app-list-aulas',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    RouterLink
  ],
  templateUrl: './aulas-profesor.component.html',
  styleUrl: './aulas-profesor.component.css'
})
export class AulasProfesorComponent {
  private modalService = inject(NgbModal);
  aula:AulaForm={
    id:0,
    clase:{id:-1,nombre:""},
    grupo:"",
    anio:""
  }
  aulas:Option[]=[];
  clases:Option[]=[];
  constructor(profesorService:ProfesorService,private aulaService:AulaService) {
    profesorService.getAulas().subscribe({
      next: (a) => {
        this.aulas = a
      },
      error: (error) => {
        alert(error);
      }
    })
    profesorService.getClases().subscribe({
      next: (c) => {
        this.clases = c
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
      this.eliminarAula(o.id)
    });
  }
  openEditarModal(id:number) {
    this.aulaService.getAula(id).subscribe({
      next: (a) => {
        const modalRef = this.modalService.open(AulaEditModalComponent,{centered:true});
        modalRef.componentInstance.aula = {
            id:a.id,
            grupo:a.grupo,
            anio:a.anio,
            clase:{nombre:a.clase},
            tema:[]
          };
        modalRef.closed.subscribe((a: Aula) => {
          this.editarAula(a)
        });
      },
      error: (error) => {
        alert(error);
      }
    })
  }
  ngOnInit(){
    const anioActual = new Date().getFullYear()-2000;
    this.aula.anio = `${anioActual}/${anioActual + 1}`;
  }
  crearAula(){
    if (this.aula.clase.id>0){
      this.aulaService.crearAula(this.aula).subscribe({
        next: (data) => {
          this.aulas.push(data)
        },
        error: (error) => {
          alert(error);
        }
      })
    }
  }
  editarAula(o:Aula){
    this.aulaService.actualizarAula(o).subscribe({
      next: (data) => {
        this.aulas.splice(this.aulas.findIndex(a=>a.id==o.id), 1, data);
      },
      error: (error) => {
        alert(error);
      }
    })
  }
  eliminarAula(id: number) {
    this.aulaService.deleteAula(id).subscribe({
      next: () => {
        this.aulas = this.aulas.filter(a => a.id != id)
      },
      error: (error) => {
        alert("No se ha podido eliminar el aula")
        alert(error);
      }
    });
  }
}
