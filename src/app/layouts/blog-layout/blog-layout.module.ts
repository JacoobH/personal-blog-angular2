import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BlogLayoutRoutes } from './blog-layout.routing';

import { ArticleComponent } from '../../article/article.component';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatRippleModule} from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSelectModule} from '@angular/material/select';
import {TimelineComponent} from "../../timeline/timeline.component";
import {ArchiveComponent} from "../../archive/archive.component";
import { ArticleDetailComponent } from '../../article-detail/article-detail.component';
import { CommentComponent } from '../../comment/comment.component';
import {LogInFormComponent} from "../../forms/log-in-form/log-in-form.component";
import {RegisterFormComponent} from "../../forms/register-form/register-form.component";

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(BlogLayoutRoutes),
        FormsModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatRippleModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatTooltipModule,
    ],
    declarations: [
        ArticleComponent,
        TimelineComponent,
        ArchiveComponent,
        ArticleDetailComponent,
        LogInFormComponent,
        RegisterFormComponent,
        CommentComponent
    ]
})

export class BlogLayoutModule {}