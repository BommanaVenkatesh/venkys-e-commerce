import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AllCategoryPage } from './all-category.page';

describe('AllCategoryPage', () => {
  let component: AllCategoryPage;
  let fixture: ComponentFixture<AllCategoryPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AllCategoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
