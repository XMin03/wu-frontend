import {Component} from '@angular/core';
import {EstudianteForm} from "../../../../interfaces/estudiante";
import {FormsModule} from "@angular/forms";
import {EstudianteService} from "../../../../services/estudiante.service";
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
export class EstudianteFormComponent {
  estudiante: EstudianteForm={
    id:0,
    nombre:"",
    apellidos:"",
    email:"",
    aula:"",
    password:"123456"
  };
  constructor(private estudianteService: EstudianteService,private route:ActivatedRoute, private router: Router) {
    this.route.params.subscribe(p => {
      this.estudiante.id = Number(p['id'])||0;
      if (this.estudiante.id!=0){
        estudianteService.getEstudiante(this.estudiante.id).subscribe({
          next:(data)=>{
            /*el profesor que se obtiene desde el back tiene demasiados campos
           de las cuales hay algunas por ejemplo clase que está serializada
            y esto provoca un error*/
            this.estudiante.id=data.id;
            this.estudiante.nombre=data.nombre;
            this.estudiante.apellidos=data.apellidos;
            this.estudiante.email=data.email;
            this.estudiante.aula=data.aula;
          },
          error:(error)=>{
            alert(error)
          }
        })
      }
    });
  }
  guardar() {
    if (this.estudiante.id==0)
      this.estudianteService.crearEstudiante(this.estudiante).subscribe({
        next:(data)=>{
          this.volver()
        },
        error:(error)=>{
          alert(error)
        }
      })
    else{
      this.estudianteService.actualizarEstudiante(this.estudiante).subscribe({
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
