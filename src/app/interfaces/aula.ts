import {Option} from "./option";
import {Tema} from "./tema";

export interface AulaForm {
  id:number,
  clase:Option,
  grupo:string,
  anio:string,
}
export interface Aula {
  id:number,
  clase:Option,
  grupo:string,
  anio:string,
  temas:Tema[],
  propietario:number
}
