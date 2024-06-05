import {Component, Input} from '@angular/core';
import {NgForOf} from "@angular/common";
import {Tema} from "../../../../../interfaces/tema";
import {TareaEstudianteComponent} from "./tarea/tarea-estudiante.component";

@Component({
  selector: 'app-tema',
  standalone: true,
    imports: [
        NgForOf,
        TareaEstudianteComponent
    ],
  templateUrl: './tema-profesor.component.html',
  styleUrl: './tema-profesor.component.css'
})
export class TemaProfesorComponent {
    @Input() tema: Tema = <Tema>{};
    constructor() {
    }
}
