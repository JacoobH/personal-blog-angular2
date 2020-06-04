import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { HttpClientModule }    from '@angular/common/http';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { AppComponent } from './app.component';
import {
  AgmCoreModule
} from '@agm/core';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import {BlogNavbarComponent} from "./blog-components/blog-navbar/blog-navbar.component";
import {BlogSidebarComponent} from "./blog-components/blog-sidebar/blog-sidebar.component";
import {BlogLayoutComponent} from "./layouts/blog-layout/blog-layout.component";
import {httpInterceptorProviders} from "./http-intercepts";
import { UserListComponent } from './user-list/user-list.component';
import { CommentListComponent } from './comment-list/comment-list.component';
import {MatInputModule} from "@angular/material/input";

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDe4PevaX5U4bWONYBZmtCKpIhVWzT-c1w'
    })
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    BlogNavbarComponent,
    BlogSidebarComponent,
    BlogLayoutComponent,


  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
