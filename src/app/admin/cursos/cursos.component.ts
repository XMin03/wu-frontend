import {Component, inject} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";
import {CursoService} from "../../services/curso.service";
import {RouterLink} from "@angular/router";
import {Option} from "../../interfaces/option";
import {ModalComponent} from "../../util/modal/modal.component";
import {FormModalComponent} from "../../util/form-modal/form-modal.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-cursos',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    NgIf,
    RouterLink
  ],
  templateUrl: './cursos.component.html',
  styleUrl: './cursos.component.css'
})
export class CursosComponent {
  private modalService = inject(NgbModal);
  searchTerm:string="";
  cursos: Option[] = [];
  nombreCurso:string="";
  constructor(private cursoService: CursoService) {
    this.buscar();
  }
  openEliminarModal(option:Option) {
    const modalRef = this.modalService.open(ModalComponent);
    modalRef.componentInstance.name = 'curso';
    modalRef.componentInstance.option = option;
    modalRef.closed.subscribe((o: Option) => {
        this.eliminarCurso(o.id)
    });
  }
  openEditarModal(o:Option) {
    const modalRef = this.modalService.open(FormModalComponent,{centered:true});
    modalRef.componentInstance.name = 'curso';
    modalRef.componentInstance.option = {id:o.id,nombre:o.nombre};
    modalRef.closed.subscribe((o: Option) => {
      this.editarCurso(o)
    });
  }
  buscar(){
    this.cursoService.buscarCurso(this.searchTerm).subscribe({
      next: (data) => {
        this.cursos = (data)
      },
      error: (error) => {
        alert(error);
      }
    })
  }
  crearCurso() {
      if (this.existe(this.nombreCurso)){
          this.cursoService.crearCurso(this.nombreCurso).subscribe({
              next: (data) => {
                  this.cursos.push(data)
              },
              error: (error) => {
                  alert(error);
              }
          });
      }else{
        alert("¡El curso ya existe!")
      }
  }
  editarCurso(o:Option){
    if (this.existe(o.nombre)){
      this.cursoService.actualizarCurso(o).subscribe({
        next: (data) => {
          this.cursos.splice(this.cursos.findIndex(a=>a.id==data.id), 1, o);
        },
        error: (error) => {
          alert(error);
        }
      })
    }else{
      alert("¡El curso ya existe!")
    }
  }
    eliminarCurso(id: number) {
        this.cursoService.deleteCurso(id).subscribe({
            next: () => {
                this.cursos = this.cursos.filter(c => c.id != id)
            },
            error: (error) => {
              alert("No se ha podido eliminar el curso")
              alert(error);
            }
        });
    }
  existe(nombre:string):boolean{
    return this.cursos.filter(c=>c.nombre==nombre).length==0;
  }
}
