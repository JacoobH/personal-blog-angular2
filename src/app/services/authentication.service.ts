import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { map } from 'rxjs/operators';
import {User} from "../models/user";
import {Authentication} from "../models/authentication";
import {UserService} from "./user.service";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private userUrl = 'http://localhost:8080/user';
  private flag: boolean = true;
  userInfo: User;
  constructor(
      private http: HttpClient,
      private userService: UserService) {
      this.userInfo = {
          username: '',
          password: '',
          permission:'',
          photoPath:'',
          photoFileName:'',
          photoContentType:''
      };
  }

  authenticate(authentication: Authentication) {
      return this.http.post<any>(`${this.userUrl}/authenticate`,authentication).pipe(
          map(
              userData => {
                  // let userInfo: User = new User('','','','img/faces','mysterion','png');
                  sessionStorage.setItem('username',authentication.username);
                  sessionStorage.setItem('password',authentication.password);
                  let tokenStr= 'Bearer '+userData.jwt;
                  sessionStorage.setItem('jwt', tokenStr);
                  this.userService.getUserWithUsername(authentication.username).subscribe( user => this.userInfo = user);
                  console.warn(this.userInfo);
                  sessionStorage.setItem('photoPath',this.userInfo.photoPath);
                  sessionStorage.setItem('photoFileName',this.userInfo.photoFileName);
                  sessionStorage.setItem('photoContentType',this.userInfo.photoContentType);
                  // if (this.flag){
                  //     localStorage.setItem('online_num','0');
                  //     console.warn('在线人数：'+localStorage.getItem('online_num'));
                  //     this.flag = false;
                  // }
                  // if (localStorage.getItem('online_num')){
                  //     localStorage.setItem('online_num','0');
                  //     console.warn('在线人数：'+localStorage.getItem('online_num'));
                  // }
                  // let online_num: number = Number(localStorage.getItem('online_num'));
                  // online_num += 1;
                  // localStorage.setItem('online_num',online_num.toString());
                  // console.warn('在线人数：'+localStorage.getItem('online_num'));
                  return userData;
              }
          )
      );
  }

    isUserLoggedIn() {
        let user = sessionStorage.getItem('username');
        return !(user === null)
    }

    logOut() {
        sessionStorage.removeItem('username');
        sessionStorage.removeItem('password');
        sessionStorage.removeItem('photoPath');
        sessionStorage.removeItem('photoFileName');
        sessionStorage.removeItem('photoContentType');
        sessionStorage.removeItem('jwt');
    }
}
