import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UtilService } from './util.service';
import { register } from 'swiper/element/bundle';
register();
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private router: Router, public util: UtilService) {}
  async ngOnInit(): Promise<void> {
    this.loadProfile();
  }
  async loadProfile() {
    await this.util
      .get('profile', false)
      .then(async (res: any) => {
        console.log(res, 'res');
        if (res.status === 'ACTIVE') {
          this.util.isLoggedIn = true;
          console.log(this.util.isLoggedIn, 'isLoggedIn');
          this.util.setCurrentUser(res);
          localStorage.setItem('accessToken', res.securityToken);
        } else {
          this.util.isLoggedIn = false;
        }
      })
      .catch((err: any) => {
        this.router.navigate(['/']);
      });
  }
}
