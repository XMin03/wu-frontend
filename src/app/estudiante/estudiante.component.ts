import { Component } from '@angular/core';
import { RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-estudiante',
  standalone: true,
  imports: [
    RouterOutlet
  ],
  templateUrl: './estudiante.component.html',
  styleUrl: './estudiante.component.css'
})
export class EstudianteComponent {
}
