import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChildCategeoryPage } from './child-categeory.page';

describe('ChildCategeoryPage', () => {
  let component: ChildCategeoryPage;
  let fixture: ComponentFixture<ChildCategeoryPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ChildCategeoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
