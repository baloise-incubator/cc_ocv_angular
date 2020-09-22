import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OCVCameraSelectorRowComponent } from './camera-selector-row.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
	imports: [CommonModule, FormsModule, ReactiveFormsModule],
	declarations: [OCVCameraSelectorRowComponent],
	exports: [OCVCameraSelectorRowComponent],
})
export class OCVCameraSelectorRowModule {}
