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
				path: 'camera-test',
				loadChildren: () =>
					import('./pages/camera-test/camera-test-page.module').then((m) => m.OCVCameraTestPageModule),
			},
			{
				path: 'camera-toggle',
				loadChildren: () =>
					import('./pages/camera-toggle/camera-toggle-page.module').then((m) => m.OCVCameraTogglePageModule),
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
