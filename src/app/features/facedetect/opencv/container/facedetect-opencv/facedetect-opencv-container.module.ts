import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { OCVFacedetectOpenCVContainerComponent } from './facedetect-opencv-container.component';
import { OCVFacedetectOpenCVModule } from '../../component/facedetect-opencv/facedetect-opencv.module';

@NgModule({
	imports: [CommonModule, OCVFacedetectOpenCVModule],
	declarations: [OCVFacedetectOpenCVContainerComponent],
	exports: [OCVFacedetectOpenCVContainerComponent],
})
export class OCVFacedetectOpenCVContainerModule {}
