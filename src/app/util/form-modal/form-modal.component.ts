import {Component, inject, Input} from '@angular/core';
import {Option} from "../../interfaces/option";
import {FormsModule} from "@angular/forms";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './form-modal.component.html',
  styleUrl: './form-modal.component.html'
})
export class FormModalComponent {
  activeModal = inject(NgbActiveModal);
  @Input() name: string="";
  @Input() option:Option= {
    id:0,
    nombre:""
  };
}
