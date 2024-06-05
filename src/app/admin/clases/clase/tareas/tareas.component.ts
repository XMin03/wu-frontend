import {Component, inject} from '@angular/core';
import {ActivatedRoute, RouterLink} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";
import {NgbModal, NgbPagination} from "@ng-bootstrap/ng-bootstrap";
import {Option} from "../../../../interfaces/option";
import {ClaseService} from "../../../../services/clase.service";
import {ModalComponent} from "../../../../util/modal/modal.component";
import {ProfesorRow} from "../../../../interfaces/profesor";
import {TareaRow} from "../../../../interfaces/tareaFase";

@Component({
  selector: 'app-tareas',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule,
    NgForOf,
    ReactiveFormsModule,
    NgIf,
    NgbPagination
  ],
  templateUrl: './tareas.component.html',
  styleUrl: './tareas.component.css'
})
export class TareasComponent {
  private modalService = inject(NgbModal);
  profesores:ProfesorRow[]=[];
  aulas:Option[]=[];
  temas:Option[]=[];
  tareas:TareaRow[]=[]
  profesorSeleccionado:number=-1;
  temaSeleccionado:number=-1;
  aulaSeleccionado:number=-1;
  id:number=0;

  page:number= 1;
  pageSize:number=10;
  collectionSize:number=0;

  constructor(private claseService:ClaseService,private route:ActivatedRoute) {
    this.route.queryParams.subscribe(p => {
      this.aulaSeleccionado=Number(p['aulaId'])||-1;
    });
    this.route.parent?.params.subscribe(p => {
      this.id = Number(p['id'])||0;
      this.claseService.getProfesoresWithTarea(this.id).subscribe({
        next: (data) => {
          this.profesores = (data)
        },
        error: (error) => {
          alert(error);
        }
      });
      this.claseService.getAllAulas(this.id).subscribe({
        next: (data) => {
          this.aulas = (data)
        },
        error: (error) => {
          alert(error);
        }
      });
      this.pageChanged()
    })
  }
  openModalTema() {
    const modalRef = this.modalService.open(ModalComponent);
    modalRef.componentInstance.name = 'tema';
    modalRef.componentInstance.option = this.temas.filter(t=>t.id==this.temaSeleccionado).at(0);
    modalRef.closed.subscribe((o: Option) => {
      this.eliminarTema(o.id)
    });
  }
  openModalTarea(option:TareaRow) {
    const modalRef = this.modalService.open(ModalComponent);
    modalRef.componentInstance.name = 'tarea';
    modalRef.componentInstance.option = option as Option;
    modalRef.closed.subscribe((o: Option) => {
      this.eliminarTarea(o.id)
    });
  }
  filter(){
    if (this.aulaSeleccionado==-1){
      this.temas=[];
      this.temaSeleccionado=-1;
    }else{
      this.claseService.filterTema(this.id,this.aulaSeleccionado).subscribe({
          next: (data) => {
              this.temas = (data)
          },
          error: (error) => {
              alert(error);
          }
      });
    }
  }
  eliminarTema(id:number){
    this.claseService.deleteTema(id).subscribe({
      next: () => {
        this.temas=this.temas.filter(t=>t.id!=id)
        this.temaSeleccionado=-1;
        this.pageChanged();
      },
      error: (error) => {
        alert(error);
      }
    });
  }
  eliminarTarea(id:number){
    this.claseService.deleteTarea(id).subscribe({
      next: () => {
        this.pageChanged();
      },
      error: (error) => {
        alert(error);
      }
    });
  }
  pageChanged(){
    this.claseService.getTareas(this.id,this.aulaSeleccionado,this.temaSeleccionado,this.profesorSeleccionado,this.page,this.pageSize).subscribe({
        next:(data)=>{
            this.tareas = (data.content as TareaRow[])
            this.page=data.pageable.pageNumber+1
            this.collectionSize=data.totalElements
        },
        error:(error)=>{
            alert(error);
        }
    })
  }
}
