import {Component, Input, OnInit} from '@angular/core';
import {CommentPageInfo} from "../models/comment-page-info";

import {CommentService} from "../services/comment.service";
import {ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Article} from "../models/article";
import {Comment} from "../models/comment";
import {User} from "../models/user";
import {NotificationService} from "../services/notification.service";
@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  aid: number;
  order: string;
  orderFlag: boolean;

  pageNo = 1;
  pageSize = 10;

  private username = sessionStorage.getItem('username');

  commentPageInfo: CommentPageInfo;



  constructor(
      private route: ActivatedRoute,
      private commentService: CommentService,
      private location: Location,
      private notificationService: NotificationService) {
      this.orderFlag = true;
  }

  ngOnInit(): void {
    this.orderSwitch();
    this.aid = +this.route.snapshot.paramMap.get('id');
    this.refresh(this.pageNo,this.pageSize,this.aid);
  }

  // get username() { return this.commentForm.get('username'); }
  // get commentText() { return this.commentForm.get('commentText'); }

  onSubmit(username: string, content: string) {
      // TODO: Use EventEmitter with form value
      let article: Article ={
          id:this.aid,
          title:'',
          content:'',
          views:0,
          releaseTime:''
      };
      // this.aid = +this.route.snapshot.paramMap.get('id');
      let user: User = {
          username:username,
          password:'',
          permission:'',
          photoPath:'',
          photoFileName:'',
          photoContentType:''
      };
      let comment: Comment = {
          id: null,
          article: article,
          user: user,
          content: content,
          releaseTime:'',
          likeNum: 0
      };
      this.commentService.addComment(comment).subscribe(
          () => this.commentSuccess(),
          error1 => this.notificationService.showNotification('bottom','right','warning','用户名或密码错误'));

      console.warn(username,content);
      // console.warn(this.commentForm.value);
  }

  commentSuccess(){
      this.refresh(this.pageNo,this.pageSize,this.aid);
      this.notificationService.showNotification('bottom','right','success','评论成功');
  }

  orderSwitch(){
    if (this.orderFlag){
        this.order = "切换为时间排序";
    }
    else {
        this.order = "切换为默认排序";
    }
    this.orderFlag = !this.orderFlag;
  }

  refresh(pageNo: number, pageSize: number, aid: number){
        this.commentService.getListOrderByLikeNum(pageNo, pageSize, aid).subscribe(pageInfo => this.commentPageInfo = pageInfo);
  }

    pageChanged(navigatePageNum: number) {
        this.pageNo = navigatePageNum;
        this.refresh(this.pageNo, this.pageSize, this.aid);
    }

    pageSizeChanged() {
        this.refresh(this.pageNo,this.pageSize, this.aid);
    }

}
