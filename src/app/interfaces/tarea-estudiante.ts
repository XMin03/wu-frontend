import {Option} from "./option";
export interface PuntoEstudiante {
  estudiante:Option;
  fase:number;
  basico:number;
  intermedio:number;
  avanzado:number;
}
export interface PuntoTarea {
  tarea:Option;
  fase:number;
  basico:number|null;
  intermedio:number|null;
  avanzado:number|null;
}
