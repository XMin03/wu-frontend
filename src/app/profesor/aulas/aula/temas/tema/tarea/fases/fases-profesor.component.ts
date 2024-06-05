import {Component, inject} from '@angular/core';
import { Location } from '@angular/common';
import {NgbAccordionModule, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {NgForOf, NgIf} from "@angular/common";
import {ActivatedRoute} from "@angular/router";
import {
  PreguntaFormGroup,
  RespuestaFormGroup,
  TareaFormGroup
} from "../../../../../../../interfaces/tareaFase";
import {TareaService} from "../../../../../../../services/tarea.service";
import {FormBuilder, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Pregunta} from "../../../../../../../interfaces/pregunta";
import {Respuesta} from "../../../../../../../interfaces/respuesta";
import {ModalComponent} from "../../../../../../../util/modal/modal.component";

@Component({
  selector: 'app-fases-profesor',
  standalone: true,
  imports: [
    NgbAccordionModule,
    NgIf,
    NgForOf,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './fases-profesor.component.html',
  styleUrl: './fases-profesor.component.css'
})
export class FasesProfesorComponent {
  private modalService = inject(NgbModal);
  tarea: TareaFormGroup=<TareaFormGroup>{};
  show:number=0;
  constructor(route:ActivatedRoute,private tareaService:TareaService,private location: Location,private fb: FormBuilder) {
      route.params.subscribe(p => {
      let id = Number(p['id'])||0;
      tareaService.getTarea(id).subscribe({
        next: (t) => {
          this.tarea=new TareaFormGroup(fb,t);
        },
        error: (error) => {
          alert(error);
        }
      })
    })
  }
  nuevaRespuesta(pregunta:PreguntaFormGroup){
    let r:Respuesta=<Respuesta>{};
    pregunta.respuestas.push(new RespuestaFormGroup(this.fb,r))
  }
  nuevaPregunta(){
    let p:Pregunta=<Pregunta>{};
    p.respuestas=[]
    this.tarea.fases.at(this.show).preguntas.push(new PreguntaFormGroup(this.fb, p));
  }
  openEliminarModal(i:number) {
    const modalRef = this.modalService.open(ModalComponent);
    modalRef.componentInstance.name = 'pregunta';
    modalRef.componentInstance.option = {nombre:"Pregunta "+(i+1)};
    modalRef.closed.subscribe(() => {
      this.tarea.fases.at(this.show).preguntas.removeAt(i);
    });
  }
  eliminarRespuesta(iPregunta:number,iRespuesta:number) {
    const modalRef = this.modalService.open(ModalComponent);
    modalRef.componentInstance.name = 'pregunta';
    modalRef.componentInstance.option = {nombre:"Respuesta "+(iRespuesta+1)+" de la pregunta "+(iPregunta+1)};
    modalRef.closed.subscribe(() => {
      this.tarea.fases.at(this.show).preguntas.at(iPregunta).respuestas.removeAt(iRespuesta)
    });
  }
  cancelar(){
    this.location.back()
  }
  guardar(){
    this.tareaService.saveTarea(this.tarea.value).subscribe({
      next: () => {
        this.location.back()
      },
      error: (error) => {
        alert(error);
      }
    })
  }
}
