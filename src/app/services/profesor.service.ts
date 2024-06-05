import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {ProfesorForm, ProfesorRow} from "../interfaces/profesor";
import {Option} from "../interfaces/option";
const PROFESORURL="http://localhost:8080/v1/api/profesores"

const HTTPOPTIONS = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ProfesorService {
  constructor(private http:HttpClient) {
  }
  getProfesor(id:number):Observable<ProfesorForm>{
    const url = `${PROFESORURL}/${id}`
    return this.http.get<ProfesorForm>(url);
  }
  buscarNotBlocked(searchTerm:string,page:number,pageSize:number,sortColumn:string,sortDirection:string):Observable<any> {
    const url = `${PROFESORURL}/notBlocked`
    let options={
      params:new HttpParams().set("buscar",searchTerm)
        .set("page",page-1)
        .set("size",pageSize)
        .set("sort",sortColumn+","+sortDirection)
    }
    return this.http.get<any>(url,options)
  }
  buscarProfesor(searchTerm:string,page:number,pageSize:number,sortColumn:string,sortDirection:string):Observable<any>{
    let options={
      params:new HttpParams().set("buscar",searchTerm)
      .set("page",page-1)
      .set("size",pageSize)
      .set("sort",sortColumn+","+sortDirection)
    }
    return this.http.get<any>(PROFESORURL,options)
  }
  getAulas():Observable<Option[]>{
    const url = `${PROFESORURL}/getAulas`
    return this.http.get<Option[]>(url)
  }
  getClases():Observable<Option[]>{
    const url = `${PROFESORURL}/getClases`
    return this.http.get<Option[]>(url)
  }
  crearProfesor(p:ProfesorForm):Observable<ProfesorRow>{
    return this.http.post<ProfesorRow>(PROFESORURL, p,HTTPOPTIONS)
  }

  actualizarProfesor(p:ProfesorForm):Observable<ProfesorRow>{
    const url = `${PROFESORURL}/${p.id}`;
    return this.http.put<ProfesorRow>(url, p, HTTPOPTIONS);
  }

  deleteProfesor(id:number){
    const url = `${PROFESORURL}/${id}`
    return this.http.delete(url, HTTPOPTIONS);
  }
}

