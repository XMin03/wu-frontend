import {Component, inject, Input} from '@angular/core';
import {Option} from "../../interfaces/option";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent {
  activeModal = inject(NgbActiveModal);

  @Input() name: string="";
  @Input() option:Option|null=null;
}
