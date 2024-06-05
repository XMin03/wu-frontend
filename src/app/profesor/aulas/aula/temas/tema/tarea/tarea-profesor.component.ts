import {Component, EventEmitter, inject, Input, Output} from '@angular/core';
import {Option} from "../../../../../../interfaces/option";
import {ModalComponent} from "../../../../../../util/modal/modal.component";
import {FormModalComponent} from "../../../../../../util/form-modal/form-modal.component";
import {TareaService} from "../../../../../../services/tarea.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {TareaDetail} from "../../../../../../interfaces/tareaFase";
import {NgClass} from "@angular/common";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-tarea',
  standalone: true,
  imports: [
    NgClass,
    RouterLink
  ],
  templateUrl: './tarea-profesor.component.html',
  styleUrl: './tarea-profesor.component.css'
})
export class TareaProfesorComponent {
  private modalService = inject(NgbModal);
  @Input() tarea: TareaDetail = <TareaDetail>{};
  @Output() delete = new EventEmitter<Option>;
  constructor(private tareaService: TareaService) {
  }
  openEliminarModal(option:Option) {
    const modalRef = this.modalService.open(ModalComponent);
    modalRef.componentInstance.name = 'tarea';
    modalRef.componentInstance.option = option;
    modalRef.closed.subscribe((o: Option) => {
      this.eliminarTarea(o.id)
    });
  }
  openEditarModal(o:Option) {
    const modalRef = this.modalService.open(FormModalComponent,{centered:true});
    modalRef.componentInstance.name = 'tarea';
    modalRef.componentInstance.option =  {id: o.id, nombre: o.nombre};
    modalRef.closed.subscribe((o: Option) => {
      this.editarTarea(o)
    });
  }
  editarTarea(o:Option){
    this.tareaService.cambiarNombre(o).subscribe({
      next: (data) => {
        this.tarea=data;
      },
      error: (error) => {
        alert(error);
      }
    })
  }
  cambiarEstado(){
    this.tareaService.cambiarEstado(this.tarea.id).subscribe({
      next: () => {
        this.tarea.visible=!this.tarea.visible
      },
      error: (error) => {
        alert(error);
      }
    });
  }
  eliminarTarea(id: number) {
    this.tareaService.deleteTarea(id).subscribe({
      next: () => {
        this.delete.emit(this.tarea)
      },
      error: (error) => {
        alert("No se ha podido eliminar el tema")
        alert(error);
      }
    });
  }
}
