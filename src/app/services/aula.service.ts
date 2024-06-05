import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Option} from "../interfaces/option";
import {Aula, AulaForm} from "../interfaces/aula";
import {ProfesorRow} from "../interfaces/profesor";
import {EstudianteRow} from "../interfaces/estudiante";

const AULAURL="http://localhost:8080/v1/api/aulas"

const HTTPOPTIONS = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class AulaService {

  constructor(private http:HttpClient) {
  }

  //Métodos (incluir tipos correctos en los argumentos)
  getAulas():Observable<Aula[]>{
    return this.http.get<Aula[]>(AULAURL);
  }
  getAula(id:number):Observable<Aula>{
    const url = `${AULAURL}/${id}`
    return this.http.get<Aula>(url);
  }
  getProfesores(id:number,searchTerm:string):Observable<ProfesorRow[]>{
    const url = `${AULAURL}/${id}/profesores`
    let options={
      params:new HttpParams().set("buscar",searchTerm)
    }
    return this.http.get<ProfesorRow[]>(url,options);
  }
  getEstudiantes(id:number,searchTerm:string):Observable<EstudianteRow[]>{
    const url = `${AULAURL}/${id}/estudiantes`
    let options={
      params:new HttpParams().set("buscar",searchTerm)
    }
    return this.http.get<EstudianteRow[]>(url,options);
  }
  crearAula(aula:AulaForm):Observable<Option>{
    return this.http.post<Option>(AULAURL,
      aula
    ,HTTPOPTIONS)  }
  crearTema(id:number,nombre:string):Observable<Option>{
    const url = `${AULAURL}/${id}`
    return this.http.post<Option>(url,
      {nombre}
      ,HTTPOPTIONS)  }
  addProf(id:number,ids:number[]):Observable<ProfesorRow[]>{
    const url = `${AULAURL}/${id}/addProf`
    return this.http.post<ProfesorRow[]>(url,
      ids
      ,HTTPOPTIONS)  }
  addEst(id:number,ids:number[]):Observable<EstudianteRow[]>{
    const url = `${AULAURL}/${id}/addEst`
    return this.http.post<EstudianteRow[]>(url,
      ids
      ,HTTPOPTIONS)  }
  actualizarAula(a:Aula):Observable<Option>{
    const url = `${AULAURL}/${a.id}`;
    return this.http.put<Option>(url, a, HTTPOPTIONS);
  }
  deleteAula(id:number){
    const url = `${AULAURL}/${id}`
    return this.http.delete(url, HTTPOPTIONS)
  }
  removeProfesor(idAula:number,idProfesor:number){
    const url = `${AULAURL}/${idAula}/profesor/${idProfesor}`
    return this.http.delete(url, HTTPOPTIONS)
  }
  removeEstudiante(idAula:number,idEstudiante:number){
    const url = `${AULAURL}/${idAula}/estudiante/${idEstudiante}`
    return this.http.delete(url, HTTPOPTIONS)
  }
}
