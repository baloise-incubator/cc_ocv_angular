import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OCVCameraToggleComponent } from './camera-toggle.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
	imports: [CommonModule, FormsModule, ReactiveFormsModule],
	declarations: [OCVCameraToggleComponent],
	exports: [OCVCameraToggleComponent],
})
export class OCVCameraToggleModule {}
