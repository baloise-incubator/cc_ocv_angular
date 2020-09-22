import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectWNRYRouteId } from '@wnry/angular-lib';

@Component({
	selector: 'ocv-facedetect-opencv-page',
	templateUrl: './facedetect-opencv-page.component.html',
	styleUrls: ['./facedetect-opencv-page.component.scss'],
})
export class OCVFacedetectOpenCVPageComponent implements OnInit {
	title: string = 'facedetect-opencv';
	routeId$: Observable<any>;

	constructor(private store: Store<any>) {}

	ngOnInit() {
		this.routeId$ = this.store.pipe(select(selectWNRYRouteId));
	}
}
