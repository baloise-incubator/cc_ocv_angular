import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WNRYPageWithTitleModule } from '@wnry/angular-lib';
import { RouterModule, Routes } from '@angular/router';
import { OCVFacedetectTensorFlowPageComponent } from './handpose-tensorflow-page.component';
import { OCVHandposeTensorFlowContainerModule } from '../../features/handpose/container/handpose-tensorflow/handpose-tensorflow-container.module';
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
		OCVHandposeTensorFlowContainerModule,
		OCVCameraSelectorContainerModule,
	],
	declarations: [OCVFacedetectTensorFlowPageComponent],
})
export class OCVHandposeTensorFlowPageModule {}
