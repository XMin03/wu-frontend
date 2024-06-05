import {Fase} from "./fase";
import {AbstractControl, FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Pregunta} from "./pregunta";
import {Respuesta} from "./respuesta";

export interface TareaFase {
  id:number,
  nombre:string,
  fases:Fase[],
}
export interface TareaDetail {
  id:number,
  nombre:string,
  visible:boolean,
}
export interface TareaRow {
  id:number,
  nombre:string,
  propietario:string,
  temaNombre:string,
  aulaGrupoAnio:string,
}
export class TareaFormGroup extends FormGroup {
  constructor(private fb: FormBuilder, tarea: TareaFase) {
    super({});
    this.addControl('id', this.fb.control(tarea.id));
    this.addControl('nombre', this.fb.control(tarea.nombre || '', Validators.required));
    this.addControl('fases', this.fb.array(tarea.fases.map(fase => new FaseFormGroup(fb, fase))));
  }

  get fases() {
    return this.get('fases') as FormArray<FaseFormGroup>;
  }
}

export class FaseFormGroup extends FormGroup {
  constructor(private fb: FormBuilder, fase: Fase) {
    super({});
    this.addControl('id', this.fb.control(fase.id));
    this.addControl('nivel', this.fb.control(fase.nivel));
    this.addControl('preguntas', this.fb.array(fase.preguntas.map(pregunta => new PreguntaFormGroup(fb, pregunta))));
  }

  get preguntas() {
    return this.get('preguntas') as FormArray<PreguntaFormGroup>;
  }
}

export class PreguntaFormGroup extends FormGroup {
  constructor(private fb: FormBuilder, pregunta: Pregunta) {
    super({});
    this.addControl('id', this.fb.control(pregunta.id));
    this.addControl('enunciado', this.fb.control(pregunta.enunciado || '', Validators.required));
    this.addControl('respuestas', this.fb.array(pregunta.respuestas.map(respuesta => new RespuestaFormGroup(fb, respuesta))));
    this.setValidators(this.validateRespuesta); // Asignamos el validador a la instancia del FormGroup
  }

  get respuestas() {
    return this.get('respuestas') as FormArray<RespuestaFormGroup>;
  }

  private validateRespuesta(control: AbstractControl): { [key: string]: any } | null {
    const respuestasArray = control.get('respuestas') as FormArray<RespuestaFormGroup>;
    const hasCorrecta = respuestasArray.controls.some(respuesta => respuesta.get('correcta')?.value === true);

    // Comprobamos si hay al menos una respuesta correcta
    return hasCorrecta ? null : { noRespuestaCorrecta: true };
  }
}
export class RespuestaFormGroup extends FormGroup {
  constructor(private fb: FormBuilder, respuesta: Respuesta) {
    super({});
    this.addControl('id', this.fb.control(respuesta.id));
    this.addControl('respuesta', this.fb.control(respuesta.respuesta || '', Validators.required));
    this.addControl('correcta', this.fb.control(respuesta.correcta || false));
  }
}
