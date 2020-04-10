import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {User} from "../models/user";
import {Observable} from "rxjs";
import {Article} from "../models/article";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userUrl = 'http://localhost:8080/user';
  httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private http: HttpClient) { }

  addUser(user: User): Observable<User> {
      return this.http.post<User>(`${this.userUrl}/add`, user, this.httpOptions);
  }

  getUserWithUsername(username: string): Observable<User>{
      return this.http.get<User>(`${this.userUrl}/getUserByUsername?username=${username}`);
  }
}
