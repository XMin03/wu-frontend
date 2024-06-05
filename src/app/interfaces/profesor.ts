export interface ProfesorRow{
  [key: string]: any
  id:number;
  nombre:string;
  apellidos:string;
  email:string;
  blocked:boolean
}
export interface ProfesorForm{
  id:number;
  nombre:string;
  apellidos:string;
  email:string;
  password:string;
}

