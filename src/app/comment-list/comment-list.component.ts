import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ArticleService} from "../services/article.service";
import {Location} from "@angular/common";
import {NotificationService} from "../services/notification.service";
import {CommentService} from "../services/comment.service";
import {Subject} from "rxjs";
import {CommentPageInfo} from "../models/comment-page-info";
import {User} from "../models/user";
import {Comment} from "../models/comment";

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.css']
})
export class CommentListComponent implements OnInit {
    aid = -1;
    pageNo = 1;
    pageSize = 5;
    // private searchTerms = new Subject<string>();
    commentPageInfo: CommentPageInfo;
    constructor(
        private route: ActivatedRoute,
        private commentService: CommentService,
        private location: Location,
        private notificationService: NotificationService,
    ) { }
  
    ngOnInit(): void {
        const id = +this.route.snapshot.paramMap.get('id');
        if (id !== -1){
            this.commentService.getListOrderByLikeNum(this.pageNo, this.pageSize, id).subscribe();
        }
        this.aid = id;
        this.refresh(this.pageNo,this.pageSize);
    }

    pageSizeChanged() {
        this.refresh(this.pageNo,this.pageSize);
    }

    // 翻页
    pageChanged(navigatepageNum: number) {
        this.pageNo = navigatepageNum;
        this.refresh(this.pageNo, this.pageSize);
    }

    removeUser (comment: Comment) {
        this.commentPageInfo.list = this.commentPageInfo.list.filter(c => c !== comment);
        this.commentService.removeComment(comment).subscribe();
    }

    refresh(pageNo: number, pageSize: number){
        this.commentService.getListOrderByLikeNum(pageNo, pageSize, this.aid).subscribe(pageInfo => this.commentPageInfo = pageInfo);
    }

}
