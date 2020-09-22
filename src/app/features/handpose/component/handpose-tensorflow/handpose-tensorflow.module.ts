import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OCVHandposeTensorFlowComponent } from './handpose-tensorflow.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
	imports: [CommonModule, FormsModule, ReactiveFormsModule],
	declarations: [OCVHandposeTensorFlowComponent],
	exports: [OCVHandposeTensorFlowComponent],
})
export class OCVFacedetectTensorFlowModule {}
