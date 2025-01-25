import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
})
export class TabsPage {
  constructor(private router: Router) {}
  activeTab: string = 'category'; // Default active tab
  navigate(page: any) {
    this.activeTab = page;
    this.router.navigate([`tabs/${page}`]);
  }
}
