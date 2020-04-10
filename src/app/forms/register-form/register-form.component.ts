import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";
import {NotificationService} from "../../services/notification.service";
@Component({
    selector: 'app-register-form',
    templateUrl: './register-form.component.html',
    styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {
    registerForm = new FormGroup({
      username: new FormControl('',[Validators.required, Validators.minLength(4), Validators.maxLength(16)]),
      email: new FormControl(''),
      password: new FormControl('',Validators.required),
      rePassword: new FormControl('',Validators.required),
    });
    constructor(
        private userService: UserService,
        private router: Router,
        private notificationService: NotificationService) { }

    ngOnInit(): void {
    }

    get username() { return this.registerForm.get('username'); }
    get password() { return this.registerForm.get('password'); }
    get rePassword() { return this.registerForm.get('rePassword'); }

    onSubmit() {
      // TODO: Use EventEmitter with form value
      this.userService.addUser(this.registerForm.value).subscribe(
          () => this.SignInSuccess(),
          error1 => this.notificationService.showNotification('bottom','right','warning','注册失败！')
      );
      console.warn(this.registerForm.value);
    }

    SignInSuccess(){
        this.router.navigate(['/blog/log-in-form']);
        this.notificationService.showNotification('bottom','right','success','注册成功！');
    }

}
