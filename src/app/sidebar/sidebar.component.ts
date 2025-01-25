import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UtilService } from '../util.service';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  constructor(
    private router: Router,
    public util: UtilService,
    private store: Store<any>
  ) {
    this.categories.forEach((category: string | number) => {
      this.selectedCategories[category] = false;
    });
    this.subCategories.forEach((category: string | number) => {
      this.selectedSubCategories[category] = false;
    });
  }
  selectedCategories: { [key: string]: boolean } = {};
  selectedSubCategories: { [key: string]: boolean } = {};
  cartCount: any = 0;
  cart: any = [];
  ngOnInit() {
    this.store.select('cart').subscribe((res) => {
      this.cart = res;
      console.log(this.cart.cart, 'cart');
      this.cartCount = this.cart.cart.length;
      console.log(this.cartCount, 'cartc');
    });
  }
  viewCart() {
    this.router.navigate(['tabs/cart']);
  }
  isPanelOpen: boolean = false;
  closePanel() {
    this.isPanelOpen = false;
  }
  openPanel() {
    this.isPanelOpen = true;
  }
  openFilterScreen: boolean = false;
  openFilter() {
    this.openFilterScreen = true;
  }
  closeFilter() {
    this.openFilterScreen = false;
  }
  logout() {
    localStorage.clear();
    this.util.isLoggedIn = false;
    this.router.navigate(['login']);
  }
  categories: any = ['Men', 'Women', 'Kids'];
  subCategories: any = ['Clothing', 'Footwear', 'Accessories'];

  applyFilter() {
    const selectedCategory = Object.keys(this.selectedCategories).filter(
      (category) => this.selectedCategories[category]
    );

    const selectedSubCategory = Object.keys(this.selectedSubCategories).filter(
      (category) => this.selectedSubCategories[category]
    );
    const payload: any = {
      category: selectedCategory ?? [],
      subCategory: selectedSubCategory ?? [],
    };
    this.util.sharedData = payload;
    this.openFilterScreen = false;
    this.selectedCategories = {};
    this.selectedSubCategories = {};
    this.router.navigate(['tabs/all-category'], {
      queryParams: { refresh: new Date().getTime() },
    });
  }
}
