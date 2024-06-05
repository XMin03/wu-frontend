import {Respuesta} from "./respuesta";

export interface Pregunta {
  id:number,
  enunciado:string;
  respuestas:Respuesta[]
}
