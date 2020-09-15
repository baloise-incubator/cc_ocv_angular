import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OCVCameraTestComponent } from './camera-test.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [OCVCameraTestComponent],
  exports: [OCVCameraTestComponent]
})
export class OCVCameraTestModule { }
