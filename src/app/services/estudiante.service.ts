import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {EstudianteForm, EstudianteRow} from "../interfaces/estudiante";
import {Option} from "../interfaces/option";
import {Tema} from "../interfaces/tema";
import {PuntoTarea} from "../interfaces/tarea-estudiante";
const ESTUDIANTEURL="http://localhost:8080/v1/api/estudiantes"

const HTTPOPTIONS = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class EstudianteService {

  constructor(private http:HttpClient) {
  }
  getEstudiante(id:number):Observable<EstudianteForm>{
    const url = `${ESTUDIANTEURL}/${id}`
    return this.http.get<EstudianteForm>(url);
  }
  buscarNotBlocked(searchTerm:string,page:number,pageSize:number,sortColumn:string,sortDirection:string):Observable<any>{
    const url = `${ESTUDIANTEURL}/notBlocked`
    let options={
      params:new HttpParams().set("buscar",searchTerm)
        .set("page",page-1)
        .set("size",pageSize)
        .set("sort",sortColumn+","+sortDirection)
    }
    return this.http.get<any>(url,options)
  }
  buscarEstudiante(searchTerm:string,page:number,pageSize:number,sortColumn:string,sortDirection:string):Observable<any>{
    let options={
      params:new HttpParams().set("buscar",searchTerm)
        .set("page",page-1)
        .set("size",pageSize)
        .set("sort",sortColumn+","+sortDirection)
    }
    return this.http.get<any>(ESTUDIANTEURL,options)
  }
  getNombreAula(id:number):Observable<any>{
    const url = `${ESTUDIANTEURL}/getAulas/${id}/nombre`
    return this.http.get<any>(url)
  }
  getTemas(aulaId:number):Observable<Tema[]>{
    const url = `${ESTUDIANTEURL}/getAulas/${aulaId}/temas`
    return this.http.get<Tema[]>(url)
  }
  getAulas():Observable<Option[]>{
    const url = `${ESTUDIANTEURL}/getAulas`
    return this.http.get<Option[]>(url)
  }
  getPuntos(idAula:number):Observable<Map<string,PuntoTarea[]>>{
    const url = `${ESTUDIANTEURL}/getPuntos/${idAula}`
    return this.http.get<Map<string,PuntoTarea[]>>(url)
  }
  crearEstudiante(e:EstudianteForm):Observable<EstudianteRow>{
    return this.http.post<EstudianteRow>(ESTUDIANTEURL, e,HTTPOPTIONS)
  }

  actualizarEstudiante(e:EstudianteForm):Observable<EstudianteRow>{
    const url = `${ESTUDIANTEURL}/${e.id}`;
    return this.http.put<EstudianteRow>(url, e, HTTPOPTIONS);
  }

  deleteEstudiante(id:number){
    const url = `${ESTUDIANTEURL}/${id}`
    return this.http.delete(url, HTTPOPTIONS);
  }
  salirAula(id:number){
    const url = `${ESTUDIANTEURL}/salirAula/${id}`
    return this.http.delete(url,HTTPOPTIONS)
  }
}
