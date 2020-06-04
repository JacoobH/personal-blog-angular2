import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {User} from "../models/user";
import {Observable} from "rxjs";
import {Article} from "../models/article";
import {ArticlePageInfo} from "../models/article-page-info";
import {UserPageInfo} from "../models/user-page-info";

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

  removeUser(user: User): Observable<User> {
      return this.http.post<User>(`${this.userUrl}/remove`, user, this.httpOptions);
  }

    modifyUser(user: User): Observable<User> {
      return this.http.post<User>(`${this.userUrl}/modify`, user, this.httpOptions);
  }

  getUserWithUsername(username: string): Observable<User>{
      return this.http.get<User>(`${this.userUrl}/getUserByUsername?username=${username}`);
  }

    getUsersWithSearchText (pageNo: number, pageSize: number, term: string): Observable<UserPageInfo> {
        const options = term ?
            { params: new HttpParams().set('searchText', term) } : {};
        return this.http.get<UserPageInfo>(`${this.userUrl}/getListBySearchText?pageNo=${pageNo}&pageSize=${pageSize}`,options);
    }
}
