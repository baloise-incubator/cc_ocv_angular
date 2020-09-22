import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { OCVHandposeTensorFlowContainerComponent } from './handpose-tensorflow-container.component';
import { OCVFacedetectTensorFlowModule } from '../../component/handpose-tensorflow/handpose-tensorflow.module';

@NgModule({
	imports: [CommonModule, OCVFacedetectTensorFlowModule],
	declarations: [OCVHandposeTensorFlowContainerComponent],
	exports: [OCVHandposeTensorFlowContainerComponent],
})
export class OCVHandposeTensorFlowContainerModule {}
