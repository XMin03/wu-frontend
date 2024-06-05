import {Component} from '@angular/core';
import {ProfesorEstudianteComponent} from "./profesor/profesor-estudiante.component";
import {FormsModule} from "@angular/forms";
import {EstudianteEstudianteComponent} from "./estudiante/estudiante-estudiante.component";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-usuarios-estudiante',
  standalone: true,
  imports: [
    ProfesorEstudianteComponent,
    EstudianteEstudianteComponent,
    FormsModule,
    RouterLink
  ],
  templateUrl: './usuarios-estudiante.component.html',
  styleUrl: './usuarios-estudiante.component.css'
})
export class UsuariosEstudianteComponent {
  constructor() {
  }
}


