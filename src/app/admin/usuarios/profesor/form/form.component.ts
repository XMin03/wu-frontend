import {Component} from '@angular/core';
import {ProfesorForm} from "../../../../interfaces/profesor";
import {FormsModule} from "@angular/forms";
import {ProfesorService} from "../../../../services/profesor.service";
import {ActivatedRoute, Router} from "@angular/router";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [
    FormsModule,
    NgIf
  ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class ProfesorFormComponent {
  profesor: ProfesorForm={
    id:0,
    nombre:"",
    apellidos:"",
    email:"",
    password:"123456"/*contraseña por defecto*/
  };
  constructor(private profesorService: ProfesorService,private route:ActivatedRoute, private router: Router) {
    this.route.params.subscribe(p => {
      this.profesor.id = Number(p['id'])||0;
      if (this.profesor.id!=0){
        profesorService.getProfesor(this.profesor.id).subscribe({
          next:(data)=>{
            /*el profesor que se obtiene desde el back tiene demasiados campos
            de las cuales hay algunas por ejemplo clase que está serializada
             y esto provoca un error*/
            this.profesor.id=data.id;
            this.profesor.nombre=data.nombre;
            this.profesor.apellidos=data.apellidos;
            this.profesor.email=data.email;
          },
          error:(error)=>{
            alert(error)
          }
        })
      }
    });
  }
  guardar() {
    if (this.profesor.id==0)
      this.profesorService.crearProfesor(this.profesor).subscribe({
        next:(data)=>{
          this.volver()
        },
        error:(error)=>{
          alert(error)
        }
      })
    else{
      this.profesorService.actualizarProfesor(this.profesor).subscribe({
        next:(data)=>{
          this.volver()
        },
        error:(error)=>{
          alert(error)
        }
      })
    }
  }
  volver() {
    this.router.navigate(['admin/usuarios'])
  }
}
