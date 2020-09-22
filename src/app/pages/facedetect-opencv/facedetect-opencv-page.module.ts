import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WNRYPageWithTitleModule } from '@wnry/angular-lib';
import { OCVFacedetectOpenCVContainerModule } from '../../features/facedetect/opencv/container/facedetect-opencv/facedetect-opencv-container.module';
import { OCVFacedetectOpenCVPageComponent } from './facedetect-opencv-page.component';

const routes: Routes = [
	{
		path: '',
		component: OCVFacedetectOpenCVPageComponent,
	},
];
@NgModule({
	imports: [CommonModule, RouterModule.forChild(routes), WNRYPageWithTitleModule, OCVFacedetectOpenCVContainerModule],
	declarations: [OCVFacedetectOpenCVPageComponent],
})
export class OCVFacedetectOpenCVPageComponentPageModule {}
