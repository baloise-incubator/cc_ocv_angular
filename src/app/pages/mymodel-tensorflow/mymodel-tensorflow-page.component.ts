import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectWNRYRouteId } from '@wnry/angular-lib';

@Component({
	selector: 'ocv-facedetect-tensorflow-page',
	templateUrl: './mymodel-tensorflow-page.component.html',
	styleUrls: ['./mymodel-tensorflow-page.component.scss'],
})
export class OCVMyModelTensorFlowPageComponent implements OnInit {
	title: string = 'Handdedection with TensorFlow';
	routeId$: Observable<any>;
	camera: MediaDeviceInfo;

	constructor(private store: Store<any>) {}

	ngOnInit() {
		this.routeId$ = this.store.pipe(select(selectWNRYRouteId));
	}

	setCamera(event: MediaDeviceInfo) {
		this.camera = event;
	}
}
