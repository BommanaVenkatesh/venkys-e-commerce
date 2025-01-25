import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UtilService } from '../util.service';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { addToCart } from '../store/cart.action';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.page.html',
  styleUrls: ['./product-view.page.scss'],
})
export class ProductViewPage implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    public util: UtilService,
    private store: Store
  ) {}
  productId: any = '';
  ngOnInit() {}
  ionViewDidEnter() {
    this.getProductDetails();
  }
  productDetails: any = {};
  async getProductDetails() {
    await this.util
      .get(
        'product/productById/' + this.activatedRoute.snapshot.params['id'],
        true
      )
      .then((data: any) => {
        this.productDetails = data;
        this.priceOfSelectedSize = this.productDetails.sizePriceMap.at(0).price;
        this.selectedSize = this.productDetails.sizePriceMap.at(0).size;
      });
  }
  onSizeChange(size: any): void {
    this.priceOfSelectedSize = size.price;
    this.selectedSize = size.size;
  }
  selectedSize: any;
  slide1: any;
  priceOfSelectedSize: any;
  addToBag() {
    this.productDetails.price = this.priceOfSelectedSize;
    this.productDetails.size = this.selectedSize;

    this.util.addToCart(this.productDetails);

    Swal.fire({
      title: 'Success!',
      heightAuto: false,
      text: 'The item has been added to your cart.',
      icon: 'success',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'OK',
    });
  }

  getImage(image: any) {
    return `${this.util.baseURL}static/${this.productDetails.uuid}/${image}`;
  }

  addToCart() {
    this.store.dispatch(addToCart({ productDetails: this.productDetails }));
  }
}
