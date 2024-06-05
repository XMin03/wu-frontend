import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Option} from "../interfaces/option";

const ASIGNATURAURL="http://localhost:8080/v1/api/asignaturas"

const HTTPOPTIONS = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class AsignaturaService {

  constructor(private http:HttpClient) {
  }

  //Métodos (incluir tipos correctos en los argumentos)
  getAsignaturas():Observable<Option[]>{
    return this.http.get<Option[]>(ASIGNATURAURL);
  }
  buscarAsignatura(searchTerm:string):Observable<Option[]>{
    let options={
      params:new HttpParams().set("buscar",searchTerm)
    }
    return this.http.get<Option[]>(ASIGNATURAURL,options)
  }
  crearAsignatura(nombre:string):Observable<Option>{
    return this.http.post<Option>(ASIGNATURAURL, {
      nombre
    },HTTPOPTIONS)  }
  actualizarAsignatura(a:Option):Observable<Option>{
    const url = `${ASIGNATURAURL}/${a.id}`;
    return this.http.put<Option>(url, a, HTTPOPTIONS);
  }
  deleteAsignatura(id:number){
    const url = `${ASIGNATURAURL}/${id}`
    return this.http.delete(url, HTTPOPTIONS);
  }
}
