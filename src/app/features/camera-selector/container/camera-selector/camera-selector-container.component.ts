import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { EntityServices } from '@ngrx/data';
import { Store } from '@ngrx/store';
import { Observable, from } from 'rxjs';

@Component({
	selector: 'ocv-camera-selector-container',
	templateUrl: './camera-selector-container.component.html',
	styleUrls: ['./camera-selector-container.component.scss'],
})
export class OCVCameraSelectorContainerComponent implements OnInit {
	@Output()
	selectMediaDevice: EventEmitter<MediaDeviceInfo> = new EventEmitter<MediaDeviceInfo>();

	mediaDevices$: Observable<MediaDeviceInfo[]>;
	constructor(private entityServices: EntityServices, private store: Store<any>) {}

	ngOnInit() {
		this.mediaDevices$ = from(window.navigator.mediaDevices.enumerateDevices());
	}

	changeCamera(camera: MediaDeviceInfo) {
		console.log('selected camera:', camera);
		this.selectMediaDevice.emit(camera);
	}
}
