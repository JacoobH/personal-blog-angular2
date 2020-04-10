import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import { Validators } from '@angular/forms';
import {AuthenticationService} from "../../services/authentication.service";
import {Router} from "@angular/router";
import {NotificationService} from "../../services/notification.service";
declare var $: any;

@Component({
  selector: 'app-log-in-form',
  templateUrl: './log-in-form.component.html',
  styleUrls: ['./log-in-form.component.css']
})
export class LogInFormComponent implements OnInit {

    logInForm = new FormGroup({
        username: new FormControl('',Validators.required),
        password: new FormControl('',Validators.required),
    });
    constructor(
      private authenticationService: AuthenticationService,
      private router: Router,
      private notificationService: NotificationService) { }

    ngOnInit(): void {
    }



    onSubmit() {
        // TODO: Use EventEmitter with form value
        this.authenticationService.authenticate(this.logInForm.value).subscribe(
                () => this.logInSuccess(),
            () => this.notificationService.showNotification('bottom','right','warning','用户名或密码错误'));

        console.warn(this.logInForm.value);
        console.warn(sessionStorage.getItem('jwt'));
        console.warn(sessionStorage.getItem('username'));
    }

    logInSuccess(){
        this.router.navigate(['/blog/user-profile']);
        this.notificationService.showNotification('bottom','right','success','登陆成功');
    }

}
