import { Component, OnInit } from '@angular/core';
import {Subject} from "rxjs";
import {ArticlePageInfo} from "../models/article-page-info";
import {UserPageInfo} from "../models/user-page-info";
import {ArticleService} from "../services/article.service";
import {UserService} from "../services/user.service";
import {debounceTime, distinctUntilChanged, switchMap} from "rxjs/operators";
import {Article} from "../models/article";
import {User} from "../models/user";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
    pageNo = 1;
    pageSize = 5;
    private searchTerms = new Subject<string>();
    userPageInfo: UserPageInfo;


    constructor(private userService: UserService) { }

    search(term: string): void {
        this.searchTerms.next(term);
    }


    ngOnInit(): void {
        this.refresh(this.pageNo,this.pageSize,null);

        this.searchTerms.pipe(
            // wait 300ms after each keystroke before considering the term
            debounceTime(300),

            // ignore new term if same as previous term
            distinctUntilChanged(),

            // switch to new search observable each time the term changes
            switchMap((term: string) => this.userService.getUsersWithSearchText(this.pageNo,this.pageSize, term)),
        ).subscribe(pageInfo => this.userPageInfo = pageInfo);
    }

    pageSizeChanged(searchText: string) {
        this.refresh(this.pageNo,this.pageSize, searchText);
    }

    // 翻页
    pageChanged(navigatepageNum: number, searchText: string) {
        this.pageNo = navigatepageNum;
        this.refresh(this.pageNo, this.pageSize, searchText);
    }

    //删除该用户
    removeUser (user: User) {
        this.userPageInfo.list = this.userPageInfo.list.filter(u => u !== user);
        this.userService.removeUser(user).subscribe();
    }

    refresh(pageNo: number, pageSize: number, searchText: string){
        this.userService.getUsersWithSearchText(pageNo, pageSize, searchText).subscribe(pageInfo => this.userPageInfo = pageInfo);
    }
}
