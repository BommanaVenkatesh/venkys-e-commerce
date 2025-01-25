import { Component, OnInit } from '@angular/core';
import { UtilService } from '../util.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
  constructor(private util: UtilService, private router: Router) {}
  cartDetails: any = [];
  ngOnInit() {}
  deliveryAddresses: any = [];
  selectedAddress: number | null = null; // To store the selected address
  async getAddress() {
    this.deliveryAddresses = [];
    await this.util.get('address', true).then((data: any) => {
      data.forEach((element: any) => {
        const address = `${element.address1},${element.address2},${element.place},${element.city},${element.state},${element.pincode}`;
        this.deliveryAddresses.push(address);
      });
    });
  }
  getImage(prod: any) {
    return `${this.util.baseURL}static/${prod.uuid}/${prod.imgUrls.at(0)}`;
  }
  ionViewDidEnter() {
    this.subTotal = 0;
    const cartData = localStorage.getItem('cart');
    this.cartDetails = cartData ? JSON.parse(cartData) : [];
    console.log(this.cartDetails, 'card');
    this.cartDetails.forEach((element: any) => {
      this.subTotal += element.price * element.qty;
    });
    this.getAddress();
  }
  removeItem(product: any) {
    this.subTotal = 0;
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to remove this item from the cart?',
      icon: 'warning',
      showCancelButton: true,
      heightAuto: false,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, remove it!',
      cancelButtonText: 'Cancel',
    }).then((result: { isConfirmed: any }) => {
      if (result.isConfirmed) {
        this.util.removeCartItem(product);
        this.cartDetails = JSON.parse(localStorage.getItem('cart') ?? '');
        this.cartDetails.forEach((element: any) => {
          this.subTotal += element.price * element.qty;
        });
        Swal.fire({
          title: 'Removed!',
          text: 'The item has been removed from the cart.',
          icon: 'success',
          heightAuto: false, // Prevents automatic height adjustment
        });
      }
    });
  }
  subTotal: number = 0;
  itemsCount: any = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  updatePricing() {
    this.subTotal = 0;
    this.cartDetails.forEach((element: any) => {
      this.subTotal += element.price * element.qty;
    });
  }
  shippingCost: number = 50;
  async createOrder() {
    this.orderDetails.orderTotal = this.subTotal + this.shippingCost;
    this.orderDetails.subTotal = this.subTotal;
    this.orderDetails.shippingCost = this.shippingCost;
    this.orderDetails.items = this.cartDetails;
    this.orderDetails.paymentMethod = 'Cash on delivery';
    await this.util.post('order', this.orderDetails, true).then((data: any) => {
      if (data.id) {
        this.util.showSuccess('Order Created Successfully');
        this.router.navigate(['tabs/category']);
        this.cartDetails = [];
        localStorage.removeItem('cart');
      } else if (data.error?.message) {
        this.util.showError(data.error.message);
      } else {
        this.util.showError('Error While Creating Order');
      }
    });
  }
  orderDetails: any = {
    address: '',
  };
}
