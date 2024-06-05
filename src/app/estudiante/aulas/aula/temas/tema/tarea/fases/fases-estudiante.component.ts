import {Component, ViewChild} from '@angular/core';
import {CommonModule, Location} from "@angular/common";
import {ActivatedRoute} from "@angular/router";
import {FaseService} from "../../../../../../../services/fase.service";
import {FaseComponent} from "./fase/fase.component";


@Component({
  selector: 'app-fases-estudiante',
  standalone: true,
  imports: [CommonModule, FaseComponent
  ],
  templateUrl: './fases-estudiante.component.html',
  styleUrl: './fases-estudiante.component.css'
})
export class FasesEstudianteComponent {
  @ViewChild(FaseComponent) childComponent!: FaseComponent;

  idTarea:number=0;
  nivelMax:number=1;
  nivel:number=0;
  constructor(route:ActivatedRoute,
    faseService:FaseService,private location: Location) {
    route.params.subscribe(p => {
      this.idTarea = Number(p['id'])||0;
      faseService.getNivelMax(this.idTarea).subscribe({
        next: (n) => {
          console.log(n)
          this.nivelMax = n;
          this.nivel=this.nivelMax;
        },
        error: (error) => {
          alert(error);
        }
      })
    })
  }
  entregar() {
    // Asegúrate de que childComponent esté inicializado
    if (this.childComponent) {
      this.childComponent.entregar();
      this.cancelar()
    } else {
      console.error('childComponent no está inicializado');
    }
  }
  cancelar(){
    this.location.back()
  }
}
