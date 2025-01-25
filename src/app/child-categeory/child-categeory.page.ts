import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilService } from '../util.service';

@Component({
  selector: 'app-child-categeory',
  templateUrl: './child-categeory.page.html',
  styleUrls: ['./child-categeory.page.scss'],
})
export class ChildCategeoryPage implements OnInit {
  constructor(
    private router: Router,
    private activateRouter: ActivatedRoute,
    private util: UtilService
  ) {}

  ngOnInit() {}

  parent: any;
  sub: any;
  ionViewDidEnter() {
    this.activateRouter.queryParams.subscribe(
      (params: { [x: string]: string }) => {
        this.parent = params['parent'];
        this.sub = params['sub'];
      }
    );

    this.findAllChildCategories();
  }
  navigateSubCategory(child: any) {
    this.router.navigate(['tabs/products'], {
      queryParams: { parent: this.parent, sub: this.sub, child: child },
    });
  }
  childCategories: any = [];
  async findAllChildCategories() {
    const payload: any = {
      category: this.parent,
      subCategory: this.sub,
    };
    await this.util
      .post('product/child-categories', payload, true)
      .then((data: any) => {
        this.childCategories = data;
      });
  }
  getImage(category: any): string {
    if (!category) {
      return '';
    }
    const lowercaseCategory = category.toLowerCase();
    return `assets/images/${lowercaseCategory}.jpg`;
  }
}
