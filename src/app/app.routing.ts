import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import {BlogLayoutComponent} from "./layouts/blog-layout/blog-layout.component";
import {AuthGuard} from "./auth/auth.guard";

const routes: Routes =[
    {
    path: '',
    redirectTo: 'blog/article',
    pathMatch: 'full',
    }, {
    path: '',
    component: AdminLayoutComponent,
    canActivate: [AuthGuard],
    children: [{
      path: '',
      loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule'
    }]
    },
    {
        path: 'blog',
        redirectTo: 'blog/article',
        pathMatch: 'full',
    },
    {
        path: 'blog',
        component: BlogLayoutComponent,
        children: [{
            path: '',
            loadChildren: './layouts/blog-layout/blog-layout.module#BlogLayoutModule'
        }]
    }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes,{
       useHash: true
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
