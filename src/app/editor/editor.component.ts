import { Component, OnInit } from '@angular/core';
import '@ckeditor/ckeditor5-build-classic/build/translations/zh-cn.js';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import {ArticleService} from "../services/article.service";

import {Article} from "../models/article";
import { AngularEditorConfig } from '@kolkov/angular-editor';
import {NotificationService} from "../services/notification.service";
@Component({
    selector: 'app-upgrade',
    templateUrl: './editor.component.html',
    styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {
    // public Editor = ClassicEditor;
    // public config = {
    //     language: 'zh-cn',
    //     placeholder: '在这里输入内容...',
    //
    // };
    config: AngularEditorConfig = {
        editable: true,
        spellcheck: true,
        height: '15rem',
        minHeight: '5rem',
        placeholder: 'Enter text here...',
        translate: 'no',
        defaultParagraphSeparator: 'p',
        defaultFontName: 'Arial',
        toolbarHiddenButtons: [
            ['bold']
        ],
        customClasses: [
            {
                name: 'quote',
                class: 'quote',
            },
            {
                name: 'redText',
                class: 'redText'
            },
            {
                name: 'titleText',
                class: 'titleText',
                tag: 'h1',
            },
        ]
    };
    article: Article;
    isEmpty: boolean = true;
    constructor(
        private route: ActivatedRoute,
        private articleService: ArticleService,
        private location: Location,
        private notificationService: NotificationService) {
        this.article = {
            id: null,
            title: '',
            content: '',
            views: null,
            releaseTime: null,
        };
    }

    ngOnInit() {
        const id = +this.route.snapshot.paramMap.get('id');
        if (id !== -1){
            this.getArticleWithId(id)
        }
    }

    getArticleWithId(id: number): void {
        this.isEmpty = false;
        this.articleService.getArticleWithId(id)
            .subscribe(article => this.article = article);
    }

    submit () {
        if (this.isEmpty){
            this.articleService.addArticle(this.article)
                .subscribe(() =>
                    this.notificationService.showNotification('bottom','right','success','发布成功'),
                    () => this.notificationService.showNotification('bottom','right','warning','发布失败'))
        }
        else {
            this.articleService.modifyArticle(this.article)
                .subscribe(() => this.notificationService.showNotification('bottom','right','success','修改成功'),
                    () => this.notificationService.showNotification('bottom','right','warning','修改失败'))
        }
    }
}