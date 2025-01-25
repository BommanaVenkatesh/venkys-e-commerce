import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'tab1',
        loadChildren: () =>
          import('../tab1/tab1.module').then((m) => m.Tab1PageModule),
      },
      {
        path: 'tab2',
        loadChildren: () =>
          import('../tab2/tab2.module').then((m) => m.Tab2PageModule),
      },
      {
        path: 'tab3',
        loadChildren: () =>
          import('../tab3/tab3.module').then((m) => m.Tab3PageModule),
      },
      {
        path: 'category',
        loadChildren: () =>
          import('../category/category.module').then(
            (m) => m.CategoryPageModule
          ),
      },
      {
        path: 'sub-category',
        loadChildren: () =>
          import('../sub-category/sub-category.module').then(
            (m) => m.SubCategoryPageModule
          ),
      },
      {
        path: 'orders',
        loadChildren: () =>
          import('../orders/orders.module').then((m) => m.OrdersPageModule),
      },
      {
        path: 'child-category',
        loadChildren: () =>
          import('../child-categeory/child-categeory.module').then(
            (m) => m.ChildCategeoryPageModule
          ),
      },
      {
        path: 'order-history',
        loadChildren: () =>
          import('../order-history/order-history.module').then(
            (m) => m.OrderHistoryPageModule
          ),
      },
      {
        path: 'products',
        loadChildren: () =>
          import('../products/products.module').then(
            (m) => m.ProductsPageModule
          ),
      },
      {
        path: 'product-view/:id',
        loadChildren: () =>
          import('../product-view/product-view.module').then(
            (m) => m.ProductViewPageModule
          ),
      },
      {
        path: 'orders/:id',
        loadChildren: () =>
          import('../orders/orders.module').then((m) => m.OrdersPageModule),
      },
      {
        path: 'cart',
        loadChildren: () =>
          import('../cart/cart.module').then((m) => m.CartPageModule),
      },
      {
        path: 'all-category',
        loadChildren: () =>
          import('../all-category/all-category.module').then(
            (m) => m.AllCategoryPageModule
          ),
      },
      {
        path: 'settings',
        loadChildren: () =>
          import('../setting/setting.module').then((m) => m.SettingPageModule),
      },
      {
        path: '',
        redirectTo: '/tabs/tab1',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/tab1',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
