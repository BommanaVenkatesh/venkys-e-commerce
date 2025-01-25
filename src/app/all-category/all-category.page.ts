import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { UtilService } from '../util.service';

@Component({
  selector: 'app-all-category',
  templateUrl: './all-category.page.html',
  styleUrls: ['./all-category.page.scss'],
})
export class AllCategoryPage implements OnInit {
  constructor(
    private router: Router,
    private util: UtilService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.activatedRoute.queryParamMap.subscribe((paramMap: ParamMap) => {
      this.getAllProducts();
    });
  }
  ionViewDidEnter() {}
  navigateProductView(product: any) {
    this.router.navigate([`tabs/product-view/${product.id}`]);
  }
  productList: any = [];
  payload: any = {};
  async getAllProducts() {
    this.payload = this.util.sharedData;

    await this.util
      .post('product/all-product', this.payload, true)
      .then((data: any) => {
        this.productList = data;
        this.util.sharedData = null;
      });
  }
  getImage(prod: any) {
    return `${this.util.baseURL}static/${prod.uuid}/${prod.imgUrls.at(0)}`;
  }
}
