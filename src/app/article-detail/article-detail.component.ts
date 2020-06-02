import { Component, OnInit } from '@angular/core';
import {ArticleService} from "../services/article.service";
import {Article} from "../models/article";
import {ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.css']
})
export class ArticleDetailComponent implements OnInit {
  article: Article;
  constructor(
      private route: ActivatedRoute,
      private articleService: ArticleService,
      private location: Location) {
      this.article = {
          id: null,
          title: '',
          content: '',
          views: null,
          releaseTime: null,
      };
  }

  ngOnInit(): void {
      const id = +this.route.snapshot.paramMap.get('id');
      this.getArticleWithId(id);
  }

  getArticleWithId(id: number): void {
      this.articleService.getArticleWithId(id)
          .subscribe(article => {
              this.article = article;
              this.article.views += 1;
              this.articleService.modifyArticle(this.article).subscribe();
          });
  }



}
