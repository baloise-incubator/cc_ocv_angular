import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectWNRYRouteId } from '@wnry/angular-lib';

@Component({
	selector: 'ocv-camera-toggle-page',
	templateUrl: './camera-toggle-page.component.html',
	styleUrls: ['./camera-toggle-page.component.scss'],
})
export class OCVCameraTogglePageComponent implements OnInit {
	title: string = 'camera-test';
	routeId$: Observable<any>;

	constructor(private store: Store<any>) {}

	ngOnInit() {
		this.routeId$ = this.store.pipe(select(selectWNRYRouteId));
	}
}
