import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Option} from "../interfaces/option";
import {TareaDetail} from "../interfaces/tareaFase";

const TEMAURL="http://localhost:8080/v1/api/temas"
const HTTPOPTIONS = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class TemaService {

  constructor(private http:HttpClient) {
  }
  crearTema(id:number,nombre:string):Observable<TareaDetail>{
    const url = `${TEMAURL}/${id}`;
    return this.http.post<TareaDetail>(url,
        {nombre}
    ,HTTPOPTIONS)
  }
  addTareas(id:number,ids:number[]):Observable<TareaDetail[]>{
    const url = `${TEMAURL}/${id}/addTareas`
    return this.http.post<TareaDetail[]>(url,
      ids
      ,HTTPOPTIONS)
  }
  actualizarTema(a:Option):Observable<Option>{
    const url = `${TEMAURL}/${a.id}`;
    return this.http.put<Option>(url, a, HTTPOPTIONS);
  }
  deleteTema(id:number){
    const url = `${TEMAURL}/${id}`
    return this.http.delete(url, HTTPOPTIONS);
  }
}
