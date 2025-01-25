import { Component, OnInit } from '@angular/core';
import { UtilService } from '../util.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})
export class OrdersPage implements OnInit {
  constructor(
    private util: UtilService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {}
  ionViewDidEnter() {
    this.getOrderDetails();
  }
  orderDetails: any = {};
  async getOrderDetails() {
    await this.util
      .get('order/' + this.activatedRoute.snapshot.params['id'], true)
      .then((data: any) => {
        this.orderDetails = data;
      });
  }
  getImage(prod: any) {
    return `${this.util.baseURL}static/${prod.uuid}/${prod.imgUrls.at(0)}`;
  }
  getOrderId(id: string) {
    if (!id) {
      return id;
    }
    return id.substring(0, 10);
  }
  convertStatus(status: string) {
    if (status) {
      return (
        status.charAt(0).toUpperCase() + status.slice(1).toLocaleLowerCase()
      );
    } else {
      return status;
    }
  }
}
