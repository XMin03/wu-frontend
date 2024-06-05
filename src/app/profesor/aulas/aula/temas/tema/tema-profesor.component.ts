import {Component, EventEmitter, inject, Input, Output} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {NgForOf} from "@angular/common";
import {Option} from "../../../../../interfaces/option";
import {ModalComponent} from "../../../../../util/modal/modal.component";
import {FormModalComponent} from "../../../../../util/form-modal/form-modal.component";
import {Tema} from "../../../../../interfaces/tema";
import {TemaService} from "../../../../../services/tema.service";
import {TareaProfesorComponent} from "./tarea/tarea-profesor.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ImportTareasComponent} from "./import-tareas/import-tareas.component";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-tema',
  standalone: true,
    imports: [
        FormsModule,
        NgForOf,
        TareaProfesorComponent
    ],
  templateUrl: './tema-profesor.component.html',
  styleUrl: './tema-profesor.component.css'
})
export class TemaProfesorComponent {
    private modalService = inject(NgbModal);
    @Input() tema: Tema = <Tema>{};
    @Output() delete = new EventEmitter<Tema>;
    tareaACrear: string = "";

    constructor(private temaService: TemaService,private route:ActivatedRoute) {
    }
    openEliminarModal(option:Option) {
        const modalRef = this.modalService.open(ModalComponent);
        modalRef.componentInstance.name = 'tema';
        modalRef.componentInstance.option = option;
        modalRef.closed.subscribe((o: Option) => {
            this.eliminarTema(o.id)
        });
    }
    openEditarModal(o:Option) {
        const modalRef = this.modalService.open(FormModalComponent,{centered:true});
        modalRef.componentInstance.name = 'tema';
        modalRef.componentInstance.option =  {id: o.id, nombre: o.nombre};
        modalRef.closed.subscribe((o: Option) => {
            this.editarTema(o)
        });
    }
    openImportModal() {
      const modalRef = this.modalService.open(ImportTareasComponent,{size:"xl",centered:true,scrollable: true,backdrop:"static"});
      this.route.parent?.params.subscribe(p => {
        modalRef.componentInstance.idAula = Number(p['id']) || 0;
      });
      modalRef.componentInstance.added=this.tema.tareas;
      modalRef.closed.subscribe((ids: number[]) => {
        this.addTareas(ids)
      });
      console.log(this.tema.tareas)
    }
    editarTema(o: Option) {
        this.temaService.actualizarTema(o).subscribe({
            next: (data) => {
                this.tema.nombre = data.nombre;
            },
            error: (error) => {
                alert(error);
            }
        })
    }
    eliminarTema(id: number) {
        this.temaService.deleteTema(id).subscribe({
            next: () => {
                this.delete.emit(this.tema)
            },
            error: (error) => {
                alert("No se ha podido eliminar el tema")
                alert(error);
            }
        });
    }
    crearTarea() {
        this.temaService.crearTema(this.tema.id,this.tareaACrear).subscribe({
            next: (data) => {
                this.tema.tareas.push(data)
            },
            error: (error) => {
                alert(error);
            }
        });
    }
    addTareas(ids:number[]){
      console.log(ids)
      this.temaService.addTareas(this.tema.id,ids).subscribe({
        next: (data) => {
          this.tema.tareas=data;
        },
        error: (error) => {
          alert(error);
        }
      })
    }
    deleteTarea(tarea:Option){
        this.tema.tareas = this.tema.tareas.filter(a => a.id != tarea.id)
    }
}
