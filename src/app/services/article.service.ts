import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {catchError, tap} from "rxjs/operators";
import {ArticlePageInfo} from "../models/article-page-info";
import {Article} from "../models/article";
import {JsonFormatter} from "tslint/lib/formatters";

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
    private articlesUrl = 'http://localhost:8080/article';
    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    constructor(private http: HttpClient) { }

    getArticlesWithSearchText (pageNo: number, pageSize: number, term: string): Observable<ArticlePageInfo> {
        const options = term ?
            { params: new HttpParams().set('searchText', term) } : {};
        return this.http.get<ArticlePageInfo>(`${this.articlesUrl}/getListBySearchText?pageNo=${pageNo}&pageSize=${pageSize}`,options);
    }

    getArticleWithId(articleId: number){
        return this.http.get<Article>(`${this.articlesUrl}/getArticleById?id=${articleId}`);
    }

    addArticle (article: Article): Observable<Article> {
        return this.http.post<Article>(`${this.articlesUrl}/add`, article, this.httpOptions);

    }

    modifyArticle (article: Article): Observable<Article> {
        return this.http.post<Article>(`${this.articlesUrl}/modify`, article, this.httpOptions);
    }

    removeArticle (article: Article): Observable<Article> {
        return this.http.post<Article>(`${this.articlesUrl}/remove`, article, this.httpOptions);
    }
}
