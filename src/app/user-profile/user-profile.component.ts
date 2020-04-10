import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  private username = sessionStorage.getItem('username');
  private password = sessionStorage.getItem('password');
  private photoPath = sessionStorage.getItem('photoPath');
  private photoFileName = sessionStorage.getItem('photoFileName');
  private photoContentType = sessionStorage.getItem('photoContentType');
  constructor() { }

  ngOnInit() {
    console.warn(this.photoFileName)
  }

}
