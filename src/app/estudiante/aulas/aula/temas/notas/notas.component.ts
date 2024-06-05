import { Component } from '@angular/core';
import {EstudianteService} from "../../../../../services/estudiante.service";
import {ActivatedRoute} from "@angular/router";
import {PuntoTarea} from "../../../../../interfaces/tarea-estudiante";
import {KeyValuePipe, NgClass, NgForOf, NgIf} from "@angular/common";
import {NgbAccordionModule} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-notas',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    NgbAccordionModule,
    KeyValuePipe,
    NgClass
  ],
  templateUrl: './notas.component.html',
  styleUrl: './notas.component.css'
})
export class NotasComponent {
  puntos: Map<string,PuntoTarea[]>=new Map<string, PuntoTarea[]>();
  constructor(estudianteService:EstudianteService,route:ActivatedRoute) {
    route.parent?.params.subscribe(p => {
      let idAula = Number(p['id'])||0;
      estudianteService.getPuntos(idAula).subscribe({
        next: (t) => {
          this.puntos = t;
        },
        error: (error) => {
          alert(error);
        }
      })
    })
  }

  protected readonly Object = Object;
}
