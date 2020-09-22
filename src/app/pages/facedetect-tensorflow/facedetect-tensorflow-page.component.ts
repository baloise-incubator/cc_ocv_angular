import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectWNRYRouteId } from '@wnry/angular-lib';

@Component({
	selector: 'ocv-facedetect-tensorflow-page',
	templateUrl: './facedetect-tensorflow-page.component.html',
	styleUrls: ['./facedetect-tensorflow-page.component.scss'],
})
export class OCVFacedetectTensorFlowPageComponent implements OnInit {
	title: string = 'camera-test';
	routeId$: Observable<any>;

	constructor(private store: Store<any>) {}

	ngOnInit() {
		this.routeId$ = this.store.pipe(select(selectWNRYRouteId));
	}
}
