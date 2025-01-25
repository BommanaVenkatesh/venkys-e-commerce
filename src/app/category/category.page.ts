import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UtilService } from '../util.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.page.html',
  styleUrls: ['./category.page.scss'],
})
export class CategoryPage implements OnInit {
  constructor(private router: Router, private util: UtilService) {}
  categoryList: any = [];
  ngOnInit() {}
  ionViewDidEnter() {
    this.getAllCategory();
    this.googleApi();
  }
  async googleApi() {
    await this.util
      .googleApi([
        [
          [
            ' Available Surveys',
            'Submit Surveys',
            'View Surveys',
            'Survey Name ',
            'Start date ',
            'End date ',
            'Submit Survey ',
            'View ',
            ' First ',
            ' Previous ',
            ' Next ',
            ' Last ',
            'Loading Surveys ',
            'Medicines',
            'Select Medicine',
          ],
          'en',
          'ta',
        ],
        'te_lib',
      ])
      .then((data: any) => {
        console.log({ data });
      });
  }
  navigateSubCategory(category: any) {
    this.router.navigate(['tabs/sub-category'], {
      queryParams: { category: category },
    });
  }

  navigateAllCategory() {
    this.router.navigate(['tabs/all-category']);
  }
  async getAllCategory() {
    await this.util.get('product/all-categories', true).then((data: any) => {
      this.categoryList = data;
    });
  }
  getImage(category: any): string {
    const lowercaseCategory = category.toLowerCase();
    return `assets/images/${lowercaseCategory}.jpg`;
  }
}
