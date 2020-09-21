import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WNRYPageWithTitleModule } from '@wnry/angular-lib';
import { RouterModule, Routes } from '@angular/router';
import { OCVCameraTogglePageComponent } from './camera-toggle-page.component';
import { OCVCameraToggleContainerModule } from '../../container/camera-toggle/camera-toggle-container.module';

const routes: Routes = [
	{
		path: '',
		component: OCVCameraTogglePageComponent,
	},
];
@NgModule({
	imports: [CommonModule, RouterModule.forChild(routes), WNRYPageWithTitleModule, OCVCameraToggleContainerModule],
	declarations: [OCVCameraTogglePageComponent],
})
export class OCVCameraTogglePageModule {}
