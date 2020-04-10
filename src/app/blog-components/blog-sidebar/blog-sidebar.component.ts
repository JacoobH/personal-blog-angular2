import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const BROUTES: RouteInfo[] = [
    { path: '/blog/article', title: '文章目录',  icon: 'book', class: '' },
    { path: '/blog/timeline', title: '时间轴',  icon:'timeline', class: '' },
    { path: '/blog/archive', title: '归档',  icon:'archive', class: '' },
    // { path: '/blog/user-profile', title: '用户资料',  icon:'person', class: '' },
];

@Component({
    selector: 'app-blog-sidebar',
    templateUrl: './blog-sidebar.component.html',
    styleUrls: ['./blog-sidebar.component.css']
})
export class BlogSidebarComponent implements OnInit {
    menuItems: any[];
    fuck:string = 'go fuck yourself';
    constructor() { }

    ngOnInit() {
        this.menuItems = BROUTES.filter(menuItem => menuItem);
    }

    isMobileMenu() {
        if ($(window).width() > 991) {
            return false;
        }
        return true;
    };
}
