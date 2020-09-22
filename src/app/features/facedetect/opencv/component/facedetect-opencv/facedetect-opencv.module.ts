import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OCVFacedetectOpenCVComponent } from './facedetect-opencv.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
	imports: [CommonModule, FormsModule, ReactiveFormsModule],
	declarations: [OCVFacedetectOpenCVComponent],
	exports: [OCVFacedetectOpenCVComponent],
})
export class OCVFacedetectOpenCVModule {}
