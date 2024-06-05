import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {StorageService} from "./storage.service";
import {Observable} from "rxjs";
import {Usuario} from "../interfaces/usuario";
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiAuthURL = "http://localhost:8080/v1/api/auth/";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private httpClient: HttpClient, private storageService: StorageService) { }



  login(email: string, password: string): Observable<Usuario> {
    return this.httpClient.post<Usuario>(
      this.apiAuthURL + 'login',
      {
        email,
        password,
      },
      this.httpOptions
    );
  }
  logout() {
    this.storageService.clean();
  }

}
