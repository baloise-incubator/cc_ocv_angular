import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WNRYPageWithTitleModule } from '@wnry/angular-lib';
import { RouterModule, Routes } from '@angular/router';
import { OCVMyModelTensorFlowPageComponent } from './mymodel-tensorflow-page.component';
import { OCVCameraSelectorContainerModule } from '../../features/camera-selector/container/camera-selector/camera-selector-container.module';
import { OCVMyModelTensorFlowContainerModule } from 'src/app/features/mymodel-tensorflow/container/mymodel-tensorflow-container.module';

const routes: Routes = [
	{
		path: '',
		component: OCVMyModelTensorFlowPageComponent,
	},
];
@NgModule({
	imports: [
		CommonModule,
		RouterModule.forChild(routes),
		WNRYPageWithTitleModule,
		OCVMyModelTensorFlowContainerModule,
		OCVCameraSelectorContainerModule,
	],
	declarations: [OCVMyModelTensorFlowPageComponent],
})
export class OCVMyModelTensorFlowPageModule {}
