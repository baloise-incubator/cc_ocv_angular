import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { OCVFacedetectTensorFlowContainerComponent } from './facedetect-tensorflow-container.component';
import { OCVFacedetectTensorFlowModule } from '../../component/facedetect-tensorflow/facedetect-tensorflow.module';

@NgModule({
	imports: [CommonModule, OCVFacedetectTensorFlowModule],
	declarations: [OCVFacedetectTensorFlowContainerComponent],
	exports: [OCVFacedetectTensorFlowContainerComponent],
})
export class OCVFacedetectTensorFlowContainerModule {}
