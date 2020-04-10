import { Component, OnInit } from '@angular/core';
import {ArticleService} from "../services/article.service";
import { Observable, Subject } from 'rxjs';
import {
    debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';
import {Article} from "../models/article";
import {ArticlePageInfo} from "../models/article-page-info";

@Component({
    selector: 'app-table-list',
    templateUrl: './table-list.component.html',
    styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit {
    pageNo = 1;
    pageSize = 5;
    private searchTerms = new Subject<string>();
    articlePageInfo: ArticlePageInfo;

    constructor(private articleService: ArticleService) { }

    search(term: string): void {
        this.searchTerms.next(term);
    }

    ngOnInit() {
        this.refresh(this.pageNo,this.pageSize,null);

        this.searchTerms.pipe(
            // wait 300ms after each keystroke before considering the term
            debounceTime(300),

            // ignore new term if same as previous term
            distinctUntilChanged(),

            // switch to new search observable each time the term changes
            switchMap((term: string) => this.articleService.getArticlesWithSearchText(this.pageNo,this.pageSize, term)),
        ).subscribe(pageInfo => this.articlePageInfo = pageInfo);
    }

    pageSizeChanged(searchText: string) {
        this.refresh(this.pageNo,this.pageSize, searchText);
    }

    // 翻页
    pageChanged(navigatepageNum: number, searchText: string) {
        this.pageNo = navigatepageNum;
        this.refresh(this.pageNo, this.pageSize, searchText);
    }

    //删除该篇文章
    removeArticle (article: Article) {
        this.articlePageInfo.list = this.articlePageInfo.list.filter(a => a !== article);
        this.articleService.removeArticle(article).subscribe();
    }

    refresh(pageNo: number, pageSize: number, searchText: string){
        this.articleService.getArticlesWithSearchText(pageNo, pageSize, searchText).subscribe(pageInfo => this.articlePageInfo = pageInfo);
    }
}
