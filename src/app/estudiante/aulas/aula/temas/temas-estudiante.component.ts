import { Component } from '@angular/core';
import {ActivatedRoute, RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";
import {NgbPagination} from "@ng-bootstrap/ng-bootstrap";
import {TemaProfesorComponent} from "./tema/tema-profesor.component";
import {EstudianteService} from "../../../../services/estudiante.service";
import {Tema} from "../../../../interfaces/tema";

@Component({
  selector: 'app-temas',
  standalone: true,
    imports: [
        FormsModule,
        NgForOf,
        ReactiveFormsModule,
        NgIf,
        NgbPagination,
        RouterLink,
        TemaProfesorComponent,
        RouterOutlet,
        RouterLinkActive
    ],
  templateUrl: './temas-estudiante.component.html',
  styleUrl: './temas-estudiante.component.css'
})
export class TemasEstudianteComponent {
  temas: Tema[]=[];
  constructor(estudianteService:EstudianteService,private route:ActivatedRoute) {
    this.route.parent?.params.subscribe(p => {
      let id = Number(p['id'])||0;
      estudianteService.getTemas(id).subscribe({
        next: (t) => {
          this.temas = t;
        },
        error: (error) => {
          alert(error);
        }
      })
    })
  }
}
