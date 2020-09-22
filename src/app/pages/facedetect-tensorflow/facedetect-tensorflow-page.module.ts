import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WNRYPageWithTitleModule } from '@wnry/angular-lib';
import { RouterModule, Routes } from '@angular/router';
import { OCVFacedetectTensorFlowPageComponent } from './facedetect-tensorflow-page.component';
import { OCVFacedetectTensorFlowContainerModule } from '../../features/facedetect/tensorflow/container/facedetect-tensorflow/facedetect-tensorflow-container.module';
import { OCVCameraSelectorContainerModule } from '../../features/camera-selector/container/camera-selector/camera-selector-container.module';

const routes: Routes = [
	{
		path: '',
		component: OCVFacedetectTensorFlowPageComponent,
	},
];
@NgModule({
	imports: [
		CommonModule,
		RouterModule.forChild(routes),
		WNRYPageWithTitleModule,
		OCVFacedetectTensorFlowContainerModule,
		OCVCameraSelectorContainerModule,
	],
	declarations: [OCVFacedetectTensorFlowPageComponent],
})
export class OCVFacedetectTensorFlowPageModule {}
