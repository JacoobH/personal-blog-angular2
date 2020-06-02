import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Tag} from "../models/tag";
import {Article} from "../models/article";

@Injectable({
  providedIn: 'root'
})
export class TagService {
    private tagsUrl = 'http://localhost:8080/tag';
    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    constructor(private http: HttpClient) { }

    addTags(article: Article, tags: Tag[]): Observable<Tag>{
        return this.http.post<Tag>(`${this.tagsUrl}/addTags?aid=${article.id}`,tags, this.httpOptions);
    }

    getListWithAll(): Observable<Tag[]>{
        return this.http.get<Tag[]>(`${this.tagsUrl}/getListByAll`, this.httpOptions);
    }

    getListByWithArticle(aid: number): Observable<Tag[]>{
        return this.http.get<Tag[]>(`${this.tagsUrl}/getListByArticle?aid=${aid}`,this.httpOptions);
    }
}
