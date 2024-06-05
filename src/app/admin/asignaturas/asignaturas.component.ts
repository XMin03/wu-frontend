import {Component, inject} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";
import {AsignaturaService} from "../../services/asignatura.service";
import {RouterLink} from "@angular/router";
import {Option} from "../../interfaces/option";
import {ModalComponent} from "../../util/modal/modal.component";
import {FormModalComponent} from "../../util/form-modal/form-modal.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
    selector: 'app-asignaturas',
    standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    NgIf,
    RouterLink
  ],
    templateUrl: './asignaturas.component.html',
    styleUrl: './asignaturas.component.css'
})
export class AsignaturasComponent {
  private modalService = inject(NgbModal);
  searchTerm:string="";
  asignaturas: Option[] = [];
  nombreAsignatura:string="";
  constructor(private asignaturaService: AsignaturaService) {
      this.buscar();
  }
  openEliminarModal(option:Option) {
    const modalRef = this.modalService.open(ModalComponent);
    modalRef.componentInstance.name = 'asignatura';
    modalRef.componentInstance.option = option;
    modalRef.closed.subscribe((o: Option) => {
        this.eliminarAsignatura(o.id)
    });
  }
  openEditarModal(o:Option) {
    const modalRef = this.modalService.open(FormModalComponent,{centered:true});
    modalRef.componentInstance.name = 'asignatura';
    modalRef.componentInstance.option = {id:o.id,nombre:o.nombre};
    modalRef.closed.subscribe((o: Option) => {
        this.editarAsignatura(o)
    });
  }
    buscar(){
      this.asignaturaService.buscarAsignatura(this.searchTerm).subscribe({
        next: (data) => {
          this.asignaturas = (data)
        },
        error: (error) => {
          alert(error);
        }
      })
    }
    crearAsignatura() {
        if (this.existe(this.nombreAsignatura)){
            this.asignaturaService.crearAsignatura(this.nombreAsignatura).subscribe({
                next: (data) => {
                    this.asignaturas.push(data)
                },
                error: (error) => {
                  alert(error);
                }
            });
        }else{
          alert("¡La asignatura ya existe!")
        }
    }
    editarAsignatura(o:Option){
      if (this.existe(o.nombre)){
          this.asignaturaService.actualizarAsignatura(o).subscribe({
          next: (data) => {
            this.asignaturas.splice(this.asignaturas.findIndex(a=>a.id==data.id), 1, o);
          },
          error: (error) => {
            alert(error);
          }
        })
      }else{
        alert("¡La asignatura ya existe!")
      }
    }
    eliminarAsignatura(id: number) {
        this.asignaturaService.deleteAsignatura(id).subscribe({
            next: () => {
                this.asignaturas = this.asignaturas.filter(a => a.id != id)
            },
            error: (error) => {
              alert("No se ha podido eliminar la asignatura")
              alert(error);
            }
        });
    }
    existe(nombre:string):boolean{
      return this.asignaturas.filter(a=>a.nombre==nombre).length==0;
    }
}
