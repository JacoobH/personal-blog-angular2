import { Component, OnInit } from '@angular/core';
import {ArticleService} from "../services/article.service";
import {ArticlePageInfo} from "../models/article-page-info";
import {Article} from "../models/article";

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
  pageNo = 1;
  pageSize = 6;
  articlePageInfo: ArticlePageInfo;
  articles: Article[];
  constructor(private articleService: ArticleService) { }

  ngOnInit(): void {
    this.refresh(this.pageNo,this.pageSize,null);
  }

  getMore(){
      this.pageSize += this.pageSize;
      this.refresh(this.pageNo,this.pageSize,null);
  }


  refresh(pageNo: number, pageSize: number, searchText: string){
      this.articleService.getArticlesWithSearchText(pageNo, pageSize, searchText).subscribe(pageInfo => this.articlePageInfo = pageInfo);
  }
}
