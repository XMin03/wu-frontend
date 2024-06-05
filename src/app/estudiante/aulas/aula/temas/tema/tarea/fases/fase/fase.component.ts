import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {NgForOf} from "@angular/common";
import {NgbAccordionModule} from "@ng-bootstrap/ng-bootstrap";
import {FaseService} from "../../../../../../../../services/fase.service";
import {FaseEstudiante} from "../../../../../../../../interfaces/faseEstudiante";

@Component({
  selector: 'app-fase',
  standalone: true,
    imports: [
      FormsModule,
      NgForOf,
      NgbAccordionModule
    ],
  templateUrl: './fase.component.html',
  styleUrl: './fase.component.css'
})
export class FaseComponent {
  @Input() nivel:number=0;
  @Input() idTarea:number=0;
  @Output() send:EventEmitter<number[]>=new EventEmitter<number[]>();
  fase:FaseEstudiante=<FaseEstudiante>{}
  selected:number[]=[];
  constructor(private faseService:FaseService) {

  }
  ngOnInit(){
    if (this.idTarea!=0&&this.nivel!=0){
      this.faseService.getFase(this.idTarea,this.nivel).subscribe({
        next: (data) => {
          this.fase = data;
        },
        error: (error) => {
          alert(error);
        }
      })
    }
  }
  ngOnChanges(): void {
    this.ngOnInit()
  }
  toggleSelection(event: any,id:number){
    const index = this.selected.indexOf(id);
    if (event.target.checked) {
      this.selected.push(id);
    } else {
      this.selected.splice(index, 1);
    }
  }
  entregar(){
    this.send.emit();
    this.faseService.entregar(this.idTarea,this.nivel,this.selected).subscribe({
      next(result){
        console.log(result);
      },
      error(error){
        alert(error)
      }
    })
  }
}
