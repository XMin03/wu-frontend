import {Pregunta} from "./pregunta";

export interface Fase {
  id:number,
  nivel:number,
  preguntas:Pregunta[]
}
