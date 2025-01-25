import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChildCategeoryPageRoutingModule } from './child-categeory-routing.module';

import { ChildCategeoryPage } from './child-categeory.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChildCategeoryPageRoutingModule
  ],
  declarations: [ChildCategeoryPage]
})
export class ChildCategeoryPageModule {}
