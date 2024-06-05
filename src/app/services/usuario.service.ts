import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
const USUARIOURL="http://localhost:8080/v1/api/usuarios"

const HTTPOPTIONS = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  constructor(private http:HttpClient) {
  }
  cambiarEstado(id:number):Observable<boolean>{
    const url = `${USUARIOURL}/cambiarEstado/${id}`;
    return this.http.put<boolean>(url, HTTPOPTIONS);
  }
  cambiarContrasenia(oldPassword:string, newPassword:string){
    const url = `${USUARIOURL}/cambiarContrasenia`;
    return this.http.put(url,{oldPassword,newPassword},HTTPOPTIONS);
  }
}
