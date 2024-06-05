import {Component, inject} from '@angular/core';
import {ActivatedRoute, RouterLink} from "@angular/router";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Option} from "../../../../interfaces/option";
import {ModalComponent} from "../../../../util/modal/modal.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgForOf} from "@angular/common";
import {ClaseService} from "../../../../services/clase.service";

@Component({
  selector: 'app-aulas',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule,
    NgForOf,
    ReactiveFormsModule
  ],
  templateUrl: './aulas-clase.component.html',
  styleUrl: './aulas-clase.component.css'
})
export class AulasClaseComponent {
  private modalService = inject(NgbModal);
  searchTerm:string="";
  aulas: Option[] = [];
  id:number=0;
  constructor(private claseService:ClaseService,route:ActivatedRoute) {
    route.parent?.params.subscribe(p => {
      this.id = Number(p['id'])||0;
      this.claseService.getAllAulas(this.id).subscribe({
        next: (data) => {
          this.aulas = (data)
        },
        error: (error) => {
          alert(error);
        }
      });
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
  buscar(){
    this.claseService.getAulas(this.id,this.searchTerm).subscribe({
      next: (data) => {
        this.aulas = (data)
      },
      error: (error) => {
        alert(error);
      }
    })
  }
  eliminarAula(id: number) {
    this.claseService.deleteAula(id).subscribe({
      next: () => {
        this.aulas = this.aulas.filter(a => a.id != id)
      },
      error: (error) => {
        alert("No se ha podido eliminar la aula")
        alert(error);
      }
    });
  }
}
