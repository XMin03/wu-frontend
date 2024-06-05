import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-aula-profesor',
  standalone: true,
  imports: [
    RouterLink,
    RouterOutlet,
    RouterLinkActive
  ],
  templateUrl: './aula-profesor.component.html',
  styleUrl: './aula-profesor.component.css'
})
export class AulaProfesorComponent {
}
