import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { OCVCameraSelectorRowModule } from '../../component/camera-selector-row/camera-selector-row.module';
import { OCVCameraSelectorContainerComponent } from './camera-selector-container.component';

@NgModule({
	imports: [CommonModule, OCVCameraSelectorRowModule],
	declarations: [OCVCameraSelectorContainerComponent],
	exports: [OCVCameraSelectorContainerComponent],
})
export class OCVCameraSelectorContainerModule {}
