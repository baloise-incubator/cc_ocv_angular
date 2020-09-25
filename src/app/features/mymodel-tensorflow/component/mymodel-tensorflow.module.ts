import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OCVMyModelTensorFlowComponent } from './mymodel-tensorflow.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
	imports: [CommonModule, FormsModule, ReactiveFormsModule],
	declarations: [OCVMyModelTensorFlowComponent],
	exports: [OCVMyModelTensorFlowComponent],
})
export class OCVMyModelTensorFlowModule {}
