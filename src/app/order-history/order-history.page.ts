import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UtilService } from '../util.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.page.html',
  styleUrls: ['./order-history.page.scss'],
})
export class OrderHistoryPage implements OnInit {
  constructor(private router: Router, private util: UtilService) {}
  orderDetails: any = [];
  ngOnInit() {}
  async getTotalOrders() {
    await this.util.get('order/user-order', true).then((data: any) => {
      this.orderDetails = data;
    });
  }
  getImage(prod: any) {
    return `${this.util.baseURL}static/${prod.uuid}/${prod.imgUrls.at(0)}`;
  }
  ionViewDidEnter() {
    this.getTotalOrders();
  }
  viewOrder(id: any) {
    this.router.navigate([`tabs/orders/${id}`]);
  }
  getOrderId(id: string) {
    return id.substring(0, 10);
  }
  convertStatus(status: string) {
    return status.charAt(0).toUpperCase() + status.slice(1).toLocaleLowerCase();
  }
}
