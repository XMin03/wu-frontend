import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Option} from "../interfaces/option";
const CURSOSURL="http://localhost:8080/v1/api/cursos"

const HTTPOPTIONS = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class CursoService {

  constructor(private http:HttpClient) {
  }

  //Métodos (incluir tipos correctos en los argumentos)
  getCursos():Observable<Option[]>{
    return this.http.get<Option[]>(CURSOSURL);
  }
  buscarCurso(searchTerm:string):Observable<Option[]>{
    let options={
      params:new HttpParams().set("buscar",searchTerm)
    }
    return this.http.get<Option[]>(CURSOSURL,options)
  }
  crearCurso(nombre:string):Observable<Option>{
    return this.http.post<Option>(CURSOSURL, {
      nombre
    },HTTPOPTIONS)
  }
  actualizarCurso(c:Option):Observable<Option>{
    const url = `${CURSOSURL}/${c.id}`;
    return this.http.put<Option>(url, c, HTTPOPTIONS);
  }
  deleteCurso(id:number){
    const url = `${CURSOSURL}/${id}`
    return this.http.delete(url, HTTPOPTIONS);
  }
}
