import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WNRYPageWithTitleModule } from '@wnry/angular-lib';
import { RouterModule, Routes } from '@angular/router';
import { OCVCameraTestPageComponent } from './camera-test-page.component';
import { OCVCameraTestContainerModule } from '../../container/camera-test/camera-test-container.module';

const routes: Routes = [
  {
    path: '',
    component: OCVCameraTestPageComponent
  }
];
@NgModule({
  imports: [
    CommonModule, RouterModule.forChild(routes),
    WNRYPageWithTitleModule,
    OCVCameraTestContainerModule
  ],
  declarations: [OCVCameraTestPageComponent]
})
export class OCVCameraTestPageModule { }
