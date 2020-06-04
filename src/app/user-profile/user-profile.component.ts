import { Component, OnInit } from '@angular/core';
import {UserService} from "../services/user.service";
import {NotificationService} from "../services/notification.service";
import {User} from "../models/user";
import {AuthenticationService} from "../services/authentication.service";
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
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
    hide = true;
    // userForm = new FormGroup({
    //     username : new FormControl(),
    //     password : new FormControl(),
    //     permission : new FormControl(),
    //     email : new FormControl('', [Validators.required, Validators.email]),
    //     lastName : new FormControl(),
    //     firstName : new FormControl(),
    //     address : new FormControl(),
    //     city : new FormControl(),
    //     street : new FormControl(),
    //     postalCode : new FormControl(),
    //     introduction : new FormControl(),
    // });
    username = new FormControl();
    password = new FormControl();
    permission = new FormControl();
    email = new FormControl('', [Validators.required, Validators.email]);
    lastName = new FormControl();
    firstName = new FormControl();
    address = new FormControl();
    city = new FormControl();
    street = new FormControl();
    postalCode = new FormControl();
    introduction = new FormControl();


  private user: User = {
      username: sessionStorage.getItem('username'),
      password: sessionStorage.getItem('password'),
      permission: '',
      email: '',
      lastName: '',
      firstName: '',
      address: '',
      city: '',
      street: '',
      postalCode: '',
      introduction: '',
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
    console.warn(this.user.photoFileName);
    this.userService.getUserWithUsername(this.user.username).subscribe(u => {
        this.user = u;
        this.username.setValue(u.username);
        this.password.setValue(u.password);
        this.permission.setValue(u.permission);
        this.email.setValue(u.email);
        this.lastName.setValue(u.lastName);
        this.firstName.setValue(u.firstName);
        this.address.setValue(u.address);
        this.city.setValue(u.city);
        this.street.setValue(u.street);
        this.postalCode.setValue(u.postalCode);
        this.introduction.setValue(u.introduction);
    });
  }

    getErrorMessage() {
        if (this.email.hasError('required')) {
            return '不能为空';
        }
        return this.email.hasError('email') ? '无效的邮箱格式' : '';
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

  modifyUser(){
      this.user.username = this.username.value;
      this.user.password = this.password.value;
      this.user.permission = this.permission.value;
      this.user.email = this.email.value;
      this.user.lastName = this.lastName.value;
      this.user.firstName = this.firstName.value;
      this.user.address = this.address.value;
      this.user.city = this.city.value;
      this.user.street = this.street.value;
      this.user.postalCode = this.postalCode.value;
      this.user.introduction = this.introduction.value;
      this.userService.modifyUser(this.user).subscribe(
          () => this.notificationService.showNotification('bottom','right','success','更新成功'),
          () => this.notificationService.showNotification('bottom','right','success','更新失败'),

      )
  }

}
