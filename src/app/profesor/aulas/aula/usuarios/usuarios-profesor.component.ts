import {Component} from '@angular/core';
import {ProfesorProfesorComponent} from "./profesor/profesor-profesor.component";
import {FormsModule} from "@angular/forms";
import {EstudianteProfesorComponent} from "./estudiante/estudiante-profesor.component";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-usuarios-profesor',
  standalone: true,
  imports: [
    ProfesorProfesorComponent,
    EstudianteProfesorComponent,
    FormsModule,
    RouterLink
  ],
  templateUrl: './usuarios-profesor.component.html',
  styleUrl: './usuarios-profesor.component.css'
})
export class UsuariosProfesorComponent {
}


