import {Component} from '@angular/core';
import {ProfesorAdminComponent} from "./profesor/profesor-admin.component";
import {EstudianteAdminComponent} from "./estudiante/estudiante-admin.component";
import {FormsModule} from "@angular/forms";
import {UsuarioService} from "../../services/usuario.service";

@Component({
  selector: 'app-admin-usuarios',
  standalone: true,
  imports: [
    ProfesorAdminComponent,
    EstudianteAdminComponent,
    FormsModule
  ],
  templateUrl: './usuarios-admin.component.html',
  styleUrl: './usuarios-admin.component.css'
})
export class UsuariosAdminComponent {
  constructor(private usuarioService:UsuarioService) {
  }
  bloquearODesbloquear(u:any){
    this.usuarioService.cambiarEstado(u.id).subscribe({
      next: (b) => {
        u.blocked = b
      },
        error: (error) => {
        alert(error);
      }
    })
  }
}


