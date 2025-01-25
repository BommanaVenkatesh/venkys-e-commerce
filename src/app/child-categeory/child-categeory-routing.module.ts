import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChildCategeoryPage } from './child-categeory.page';

const routes: Routes = [
  {
    path: '',
    component: ChildCategeoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChildCategeoryPageRoutingModule {}
