import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Option} from "../interfaces/option";
import {TareaFase, TareaDetail} from "../interfaces/tareaFase";
import {PuntoEstudiante} from "../interfaces/tarea-estudiante";

const TAREASURL="http://localhost:8080/v1/api/tareas"
const HTTPOPTIONS = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};
@Injectable({
  providedIn: 'root'
})
export class TareaService {
  constructor(private http:HttpClient) {
  }
  getTarea(id:number):Observable<TareaFase>{
    const url = `${TAREASURL}/${id}`;
    return this.http.get<TareaFase>(url, HTTPOPTIONS);
  }
  getPuntos(id:number):Observable<PuntoEstudiante[]>{
    const url = `${TAREASURL}/${id}/puntos`;
    return this.http.get<PuntoEstudiante[]>(url, HTTPOPTIONS);
  }
  cambiarNombre(a:Option):Observable<TareaDetail>{
    const url = `${TAREASURL}/${a.id}/cambiarNombre`;
    return this.http.put<TareaDetail>(url, a, HTTPOPTIONS);
  }
  saveTarea(a:TareaFase){
    const url = `${TAREASURL}/${a.id}`;
    return this.http.put(url, a, HTTPOPTIONS);
  }
  cambiarEstado(id:number):Observable<boolean>{
    const url = `${TAREASURL}/${id}/cambiarEstado`;
    return this.http.put<boolean>(url, HTTPOPTIONS);
  }
  changeNivel(tareaId:number,estudianteId:number,nivel:number):Observable<number>{
    const url = `${TAREASURL}/${tareaId}/estudiante/${estudianteId}/${nivel}`;
    return this.http.put<number>(url, HTTPOPTIONS);
  }
  deleteTarea(id:number){
    const url = `${TAREASURL}/${id}`
    return this.http.delete(url, HTTPOPTIONS);
  }
}
