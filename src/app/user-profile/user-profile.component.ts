import { Component, OnInit } from '@angular/core';
import {UserService} from "../services/user.service";
import {NotificationService} from "../services/notification.service";
import {User} from "../models/user";
import {AuthenticationService} from "../services/authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  // private username = sessionStorage.getItem('username');
  // private password = sessionStorage.getItem('password');
  // private photoPath = sessionStorage.getItem('photoPath');
  // private photoFileName = sessionStorage.getItem('photoFileName');
  // private photoContentType = sessionStorage.getItem('photoContentType');

  private user: User = {
      username: sessionStorage.getItem('username'),
      password: sessionStorage.getItem('password'),
      permission: '',
      photoPath: sessionStorage.getItem('photoPath'),
      photoFileName: sessionStorage.getItem('photoFileName'),
      photoContentType: sessionStorage.getItem('photoContentType')
  };
  constructor(
      private userService: UserService,
      private notificationService: NotificationService,
      private authenticationService: AuthenticationService,
      private router: Router) { }

  ngOnInit() {
    console.warn(this.user.photoFileName)
  }

  onSubmit(password: string){
    if (this.user.password == password){
      this.userService.removeUser(this.user).subscribe(
          () => this.successfullyDelete(),
          () => this.notificationService.showNotification('bottom','right','warning','删除失败')
      );
    }
    else {
      this.notificationService.showNotification('bottom','right','warning','密码错误');
    }
  }

  successfullyDelete(){
      this.authenticationService.logOut();
      this.router.navigate(['/blog/article']);
      this.notificationService.showNotification('bottom','right','success','用户已成功删除');

  }

}
