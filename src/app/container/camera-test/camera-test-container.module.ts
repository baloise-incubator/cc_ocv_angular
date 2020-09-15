import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { OCVCameraTestContainerComponent } from './camera-test-container.component';
import { OCVCameraTestModule } from 'src/app/components/camera-test/camera-test.module';

@NgModule({
  imports: [
    CommonModule,
    OCVCameraTestModule
  ],
  declarations: [OCVCameraTestContainerComponent],
  exports: [OCVCameraTestContainerComponent]
})
export class OCVCameraTestContainerModule { }
