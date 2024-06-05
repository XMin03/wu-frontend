import {Component} from '@angular/core';
import {NgClass, NgFor, NgIf} from "@angular/common";
import {NgbPaginationModule} from "@ng-bootstrap/ng-bootstrap";
import {FormsModule} from "@angular/forms";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {AulaService} from "../../../../../services/aula.service";
import {EstudianteRow} from "../../../../../interfaces/estudiante";

@Component({
  selector: 'app-estudiante-estudiante',
  standalone: true,
  imports: [NgFor, NgIf, NgbPaginationModule, NgClass, FormsModule, RouterLink,
  ],
  templateUrl: './estudiante-estudiante.component.html',
  styleUrl: './estudiante-estudiante.component.css'
})
export class EstudianteEstudianteComponent {
  estudiantes:EstudianteRow[]=[];
  searchTerm:string="";
  sortColumn= '';
  sortDirection= '';
  id:number=0
  constructor(private aulaService:AulaService,private route:ActivatedRoute) {
    this.route.parent?.params.subscribe(p => {
      this.id = Number(p['id'])||0;
      this.getEstudiantes();
    })
  }
  onSort(column:string) {
    if (this.sortColumn==column)
      if (this.sortDirection=="desc")
        this.sortColumn="";
      else
        this.sortDirection = this.sortDirection =="asc"?"desc":"asc";
    else{
      this.sortColumn=column
      this.sortDirection = "asc";
    }
    this.sort()
  }
  sort(){
    if (!(this.sortDirection === '' || this.sortColumn === '')) {
      const compare = (a: EstudianteRow, b: EstudianteRow) => {
        const v1 = a[this.sortColumn];
        const v2 = b[this.sortColumn];
        let res = v1 < v2 ? -1 : v1 > v2 ? 1 : 0
        return this.sortDirection === 'asc' ? res : -res;
      };
      this.estudiantes.sort(compare);
    }
  }
  getEstudiantes(){
    this.aulaService.getEstudiantes(this.id,this.searchTerm).subscribe({
      next: (data) => {
        this.estudiantes = data
        this.sort()
      },
      error: (error) => {
        alert(error);
      }
    })
  }
}
