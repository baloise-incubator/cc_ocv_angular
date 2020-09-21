import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { OCVCameraToggleContainerComponent } from './camera-toggle-container.component';
import { OCVCameraToggleModule } from 'src/app/components/camera-toggle/camera-toggle.module';

@NgModule({
	imports: [CommonModule, OCVCameraToggleModule],
	declarations: [OCVCameraToggleContainerComponent],
	exports: [OCVCameraToggleContainerComponent],
})
export class OCVCameraToggleContainerModule {}
