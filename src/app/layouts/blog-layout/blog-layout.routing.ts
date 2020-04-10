import { Routes } from '@angular/router';

import { ArticleComponent } from "../../article/article.component";
import {TimelineComponent} from "../../timeline/timeline.component";
import {ArchiveComponent} from "../../archive/archive.component";
import { ArticleDetailComponent } from '../../article-detail/article-detail.component';
import {RegisterFormComponent} from "../../forms/register-form/register-form.component";
import {LogInFormComponent} from "../../forms/log-in-form/log-in-form.component";
import {UserProfileComponent} from "../../user-profile/user-profile.component";

export const BlogLayoutRoutes: Routes = [
    { path: 'article',      component: ArticleComponent , data: {animation: 'Article'} },
    { path: 'timeline',      component: TimelineComponent , data: {animation: 'Timeline'} },
    { path: 'archive',      component: ArchiveComponent , data: {animation: 'Archive'} },
    { path: 'article-detail/:id',      component: ArticleDetailComponent , data: {animation: 'ArticleDetail'} },
    { path: 'register-form',      component: RegisterFormComponent , data: {animation: 'RegisterForm'} },
    { path: 'log-in-form',      component: LogInFormComponent , data: {animation: 'LogInForm'} },
    { path: 'user-profile',      component: UserProfileComponent , data: {animation: 'UserProfile'} },
];
