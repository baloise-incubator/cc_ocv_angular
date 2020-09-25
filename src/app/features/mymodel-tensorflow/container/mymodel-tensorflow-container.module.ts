import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { OCVMyModelTensorFlowContainerComponent } from './mymodel-tensorflow-container.component';
import { OCVMyModelTensorFlowModule } from '../component/mymodel-tensorflow.module';

@NgModule({
	imports: [CommonModule, OCVMyModelTensorFlowModule],
	declarations: [OCVMyModelTensorFlowContainerComponent],
	exports: [OCVMyModelTensorFlowContainerComponent],
})
export class OCVMyModelTensorFlowContainerModule {}
