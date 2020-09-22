import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OCVFacedetectTensorFlowComponent } from './facedetect-tensorflow.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
	imports: [CommonModule, FormsModule, ReactiveFormsModule],
	declarations: [OCVFacedetectTensorFlowComponent],
	exports: [OCVFacedetectTensorFlowComponent],
})
export class OCVFacedetectTensorFlowModule {}
