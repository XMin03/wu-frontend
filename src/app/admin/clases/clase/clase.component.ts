import { Component } from '@angular/core';
import {ActivatedRoute, RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {ClaseService} from "../../../services/clase.service";
import {Option} from "../../../interfaces/option";

@Component({
  selector: 'app-clase',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './clase.component.html',
  styleUrl: './clase.component.css'
})
export class ClaseComponent {
  clase:Option=<Option>{}
  constructor(private claseService:ClaseService,private route:ActivatedRoute) {
    this.route.params.subscribe(p => {
      let id = Number(p['id'])||0;
      claseService.getClase(id).subscribe({
        next: (data) => {
          this.clase = (data)
        },
        error: (error) => {
          alert(error);
        }
      })
    })
  }
}
