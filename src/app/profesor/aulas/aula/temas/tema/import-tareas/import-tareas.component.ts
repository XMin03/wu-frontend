import {Component, inject, Input} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {NgbActiveModal, NgbPagination} from "@ng-bootstrap/ng-bootstrap";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ProfesorRow} from "../../../../../../interfaces/profesor";
import {Option} from "../../../../../../interfaces/option";
import {TareaRow} from "../../../../../../interfaces/tareaFase";
import {ClaseService} from "../../../../../../services/clase.service";
import {AulaService} from "../../../../../../services/aula.service";

@Component({
  selector: 'app-import-tareas',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    NgbPagination,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './import-tareas.component.html',
  styleUrl: './import-tareas.component.css'
})
export class ImportTareasComponent {
  activeModal = inject(NgbActiveModal);
  profesores:ProfesorRow[]=[];
  aulas:Option[]=[];
  temas:Option[]=[];
  tareas:TareaRow[]=[]
  @Input() added:TareaRow[]=[];
  selected:TareaRow[]=[];
  profesorSeleccionado:number=-1;
  temaSeleccionado:number=-1;
  aulaSeleccionado:number=-1;
  idClase:number=0;
  @Input() idAula:number=0;
  page:number= 1;
  pageSize:number=10;
  collectionSize:number=0;

  constructor(private aulaService:AulaService,private claseService:ClaseService) {
  }
  ngOnInit(){
    this.aulaService.getAula(this.idAula).subscribe({
      next: (data) => {
        this.idClase = data.clase.id;
        this.claseService.getProfesoresWithTarea(this.idClase).subscribe({
          next: (data) => {
            this.profesores = (data)
          },
          error: (error) => {
            alert(error);
          }
        });
        this.claseService.getAllAulas(this.idClase).subscribe({
          next: (data) => {
            this.aulas = (data)
          },
          error: (error) => {
            alert(error);
          }
        });
        this.pageChanged();
      },
      error: (error) => {
        alert(error);
      }
    });

  }
  filter(){
    if (this.aulaSeleccionado==-1){
      this.temas=[];
      this.temaSeleccionado=-1;
    }else{
      this.claseService.filterTema(this.idClase,this.aulaSeleccionado).subscribe({
        next: (data) => {
          this.temas = (data)
        },
        error: (error) => {
          alert(error);
        }
      });
    }
  }
  pageChanged(){
    this.claseService.getTareas(this.idClase,this.aulaSeleccionado,this.temaSeleccionado,this.profesorSeleccionado,this.page,this.pageSize).subscribe({
      next:(data)=>{
        this.tareas = (data.content as TareaRow[])
        console.log(this.tareas)
        this.page=data.pageable.pageNumber+1
        this.collectionSize=data.totalElements
      },
      error:(error)=>{
        alert(error);
      }
    })
  }
  toggleSelection(tarea: TareaRow): void {
    const index = this.selected.indexOf(tarea);
    if (!this.isSelected(tarea.id)) {
      this.selected.push(tarea);
    } else {
      this.selected.splice(index, 1);
    }
  }
  isSelected(id:number): boolean {
    return this.selected.some(p => p.id === id);
  }
  isAdded(id:number): boolean {
    return this.added.some(p => p.id === id);
  }
  guardar(){
    this.activeModal.close(this.selected.map(p=>p.id))
  }
}
