import { Component, OnInit } from '@angular/core';
import { UtilService } from '../util.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  constructor(public util: UtilService, private router: Router) {}

  ngOnInit() {}
  loginDetails: any = {
    phoneNumber: '9666437042',
    password: 'P@$$w0rd',
  };
  async login() {
    await this.util.post('auth', this.loginDetails, true).then((data: any) => {
      if (data.id) {
        console.log(data, 'data');
        this.userDetails = data;
        this.util.loggedInUser = data;
        this.util.isLoggedIn = true;
        this.util.setCurrentUser(data);
        localStorage.setItem('accessToken', data.securityToken);
        this.router.navigate(['tabs/category']);
      } else if (data.error?.message) {
        this.util.showError(data.error.message);
      }
    });
  }
  isLoginScreen: boolean = true;
  userDetails: any = {};
  async register() {
    this.userDetails.role = 'USER';
    await this.util
      .post('user/create-user', this.userDetails, true)
      .then((data: any) => {
        if (data.id) {
          this.util.showSuccess('User Registered Successfully');
          this.isLoginScreen = true;
        } else if (data.error?.message) {
          this.util.showError(data.error.message);
        }
      });
  }
}
