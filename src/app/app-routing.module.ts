import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
	WNRYAdminLTE3LayoutComponent,
	WNRYHttp404PageComponent,
	WNRYLoginComponent,
	WNRYSessionPagesLayoutComponent,
} from '@wnry/angular-lib';
import { RightHeaderComponent } from './components/right-header/right-header.component';

const routes: Routes = [
	{
		path: 'session',
		component: WNRYSessionPagesLayoutComponent,
		children: [
			{
				path: 'login',
				component: WNRYLoginComponent,
			},
			{
				path: '**',
				component: WNRYHttp404PageComponent,
			},
		],
	},
	{
		path: '',
		component: WNRYAdminLTE3LayoutComponent,
		children: [
			{
				path: '',
				component: RightHeaderComponent,
				outlet: 'rightHeader',
			},
			{
				path: 'facedetect/opencv',
				loadChildren: () =>
					import('./pages/facedetect-opencv/facedetect-opencv-page.module').then(
						(m) => m.OCVFacedetectOpenCVPageModule
					),
			},
			{
				path: 'facedetect/tensorflow',
				loadChildren: () =>
					import('./pages/facedetect-tensorflow/facedetect-tensorflow-page.module').then(
						(m) => m.OCVFacedetectTensorFlowPageModule
					),
			},
			{
				path: '**',
				component: WNRYHttp404PageComponent,
			},
		],
	},
	{
		path: '',
		component: RightHeaderComponent,
		outlet: 'rightHeader',
	},
	{
		path: '**',
		component: WNRYHttp404PageComponent,
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
