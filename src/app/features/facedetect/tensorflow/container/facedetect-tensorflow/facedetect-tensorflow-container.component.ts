import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { EntityCollectionService, EntityServices } from '@ngrx/data';

@Component({
	selector: 'ocv-facedetect-tensorflow-container',
	templateUrl: './facedetect-tensorflow-container.component.html',
	styleUrls: ['./facedetect-tensorflow-container.component.scss'],
})
export class OCVFacedetectTensorFlowContainerComponent implements OnInit {
	@Input()
	camera: MediaDeviceInfo;

	constructor(private entityServices: EntityServices, private store: Store<any>) {}

	ngOnInit() {}
}
