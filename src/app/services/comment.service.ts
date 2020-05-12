import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {CommentPageInfo} from "../models/comment-page-info";
import {Comment} from "../models/comment";
import {Article} from "../models/article";

@Injectable({
  providedIn: 'root'
})
export class CommentService {
    private commentsUrl = 'http://localhost:8080/comment';
    httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    constructor(private http: HttpClient) { }

    addComment(comment: Comment): Observable<Comment>{
        return this.http.post<Comment>(`${this.commentsUrl}/add`,comment,this.httpOptions);
    }

    removeComment (comment: Comment): Observable<Comment> {
        return this.http.post<Comment>(`${this.commentsUrl}/remove`, comment, this.httpOptions);
    }

    getListOrderByLikeNum (pageNo: number, pageSize: number, aid: number): Observable<CommentPageInfo> {
        return this.http.get<CommentPageInfo>(`${this.commentsUrl}/getListByArticle?pageNo=${pageNo}&pageSize=${pageSize}&aid=${aid}`);
    }

}
