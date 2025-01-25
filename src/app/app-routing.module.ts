import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: 'category',
    loadChildren: () =>
      import('./category/category.module').then((m) => m.CategoryPageModule),
  },
  {
    path: 'sub-category',
    loadChildren: () =>
      import('./sub-category/sub-category.module').then(
        (m) => m.SubCategoryPageModule
      ),
  },
  {
    path: 'products',
    loadChildren: () =>
      import('./products/products.module').then((m) => m.ProductsPageModule),
  },
  {
    path: 'child-category',
    loadChildren: () =>
      import('./child-categeory/child-categeory.module').then(
        (m) => m.ChildCategeoryPageModule
      ),
  },
  {
    path: 'product-view',
    loadChildren: () =>
      import('./product-view/product-view.module').then(
        (m) => m.ProductViewPageModule
      ),
  },
  {
    path: 'orders',
    loadChildren: () =>
      import('./orders/orders.module').then((m) => m.OrdersPageModule),
  },
  {
    path: 'order-history',
    loadChildren: () =>
      import('./order-history/order-history.module').then(
        (m) => m.OrderHistoryPageModule
      ),
  },
  {
    path: 'cart',
    loadChildren: () =>
      import('./cart/cart.module').then((m) => m.CartPageModule),
  },
  {
    path: 'all-category',
    loadChildren: () =>
      import('./all-category/all-category.module').then(
        (m) => m.AllCategoryPageModule
      ),
  },
  {
    path: '',
    loadChildren: () =>
      import('./tabs/tabs.module').then((m) => m.TabsPageModule),
  },
  {
    path: 'setting',
    loadChildren: () => import('./setting/setting.module').then( m => m.SettingPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
