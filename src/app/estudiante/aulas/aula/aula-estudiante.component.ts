import { Component } from '@angular/core';
import {ActivatedRoute, RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {EstudianteService} from "../../../services/estudiante.service";

@Component({
  selector: 'app-aula-estudiante',
  standalone: true,
    imports: [
        RouterLink,
        RouterOutlet,
        RouterLinkActive
    ],
  templateUrl: './aula-estudiante.component.html',
  styleUrl: './aula-estudiante.component.css'
})
export class AulaEstudianteComponent {
  nombreAula: string="";
  constructor(estudianteService:EstudianteService,private route:ActivatedRoute) {
    this.route.params.subscribe(p => {
      let id = Number(p['id'])||0;
      estudianteService.getNombreAula(id).subscribe({
        next: (a) => {
          this.nombreAula=a.nombreAula
        },
        error: (error) => {
          alert(error);
        }
      })
    })
  }
}
