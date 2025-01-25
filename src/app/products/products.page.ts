import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilService } from '../util.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {
  constructor(
    private router: Router,
    private activateRouter: ActivatedRoute,
    public util: UtilService
  ) {}

  ngOnInit() {}
  parent: any;
  sub: any;
  child: any;
  ionViewDidEnter() {
    this.activateRouter.queryParams.subscribe(
      (params: { [x: string]: string }) => {
        this.parent = params['parent'];
        this.sub = params['sub'];
        this.child = params['child'];
      }
    );

    this.findAllProducts();
  }
  navigateProductView(product: any) {
    this.router.navigate([`tabs/product-view/${product.id}`]);
  }
  productList: any = [];

  async findAllProducts() {
    const payload: any = {
      category: this.parent,
      subCategory: this.sub,
      childCategory: this.child,
    };
    await this.util
      .post('product/categories-product', payload, true)
      .then((data: any) => {
        this.productList = data;
      });
  }

  getSizes(prod: any): string {
    if (!prod.sizePriceMap || !Array.isArray(prod.sizePriceMap)) {
      return ''; // Return empty string if sizePriceMap is not valid
    }

    return prod.sizePriceMap
      .map((element: any) => element.size) // Extract sizes
      .filter((size: any) => size) // Filter out invalid or falsy sizes
      .join(','); // Join sizes with a comma
  }
  getImage(prod: any) {
    console.log(
      `${this.util.baseURL}static/${prod.uuid}/${prod.imgUrls.at(0)}`
    );
    return `${this.util.baseURL}static/${prod.uuid}/${prod.imgUrls.at(0)}`;
  }
}
