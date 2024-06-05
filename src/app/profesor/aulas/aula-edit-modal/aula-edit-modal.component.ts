import {Component, inject, Input} from '@angular/core';
import {AulaForm} from "../../../interfaces/aula";
import {FormsModule} from "@angular/forms";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-aula-edit-modal',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './aula-edit-modal.component.html',
  styleUrl: './aula-edit-modal.component.css'
})
export class AulaEditModalComponent {
  @Input() aula: AulaForm=<AulaForm>{};
  activeModal = inject(NgbActiveModal);

  close(){
    this.activeModal.close(this.aula)
  }
}
