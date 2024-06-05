import {Component, Input} from '@angular/core';
import {TareaDetail} from "../../../../../../interfaces/tareaFase";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-tarea',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './tarea-estudiante.component.html',
  styleUrl: './tarea-estudiante.component.css'
})
export class TareaEstudianteComponent {
  @Input() tarea: TareaDetail = <TareaDetail>{};
  constructor() {
  }
}
