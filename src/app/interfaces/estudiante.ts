export interface EstudianteRow{
  [key: string]: any;
  id:number;
  nombre:string;
  apellidos:string;
  email:string;
  aula:string;
  blocked:boolean;
}
export interface EstudianteForm{
  id:number;
  nombre:string;
  apellidos:string;
  email:string;
  aula:string;
  password:string;
}
