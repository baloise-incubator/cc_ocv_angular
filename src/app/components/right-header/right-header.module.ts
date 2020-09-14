import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RightHeaderComponent } from './right-header.component';
import { WNRYHeaderWidgetLogoutModule, WNRYHeaderWidgetMyProfileModule, WNRYHeaderWidgetUpdateModule } from '@wnry/angular-lib';



@NgModule({
  declarations: [RightHeaderComponent],
  imports: [
    CommonModule, WNRYHeaderWidgetLogoutModule, WNRYHeaderWidgetMyProfileModule, WNRYHeaderWidgetUpdateModule
  ],
  exports: [RightHeaderComponent],

})
export class RightHeadertModule { }
