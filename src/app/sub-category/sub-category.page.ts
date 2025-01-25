import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilService } from '../util.service';

@Component({
  selector: 'app-sub-category',
  templateUrl: './sub-category.page.html',
  styleUrls: ['./sub-category.page.scss'],
})
export class SubCategoryPage implements OnInit {
  constructor(
    private router: Router,
    private activateRouter: ActivatedRoute,
    private util: UtilService
  ) {}
  category: any;
  subCategories: any = [];
  ngOnInit() {}
  ionViewDidEnter() {
    this.activateRouter.queryParams.subscribe(
      (params: { [x: string]: string }) => {
        if (params['category']) {
          this.category = params['category'];
        }
      }
    );
    this.findAllSubCategories();
  }
  async findAllSubCategories() {
    await this.util
      .post('product/sub-categories', { category: this.category }, true)
      .then((data: any) => {
        this.subCategories = data;
      });
  }

  getImage(category: any): string {
    if (category) {
      const lowercaseCategory = category.toLowerCase();
      return `assets/images/${lowercaseCategory}.jpg`;
    }
    return category;
  }
  navigateSubCategory(sub: any) {
    this.router.navigate(['tabs/child-category'], {
      queryParams: { parent: this.category, sub: sub },
    });
  }
}
