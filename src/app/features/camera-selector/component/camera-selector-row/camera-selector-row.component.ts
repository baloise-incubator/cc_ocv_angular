import { Component, Input, OnInit } from '@angular/core';

@Component({
	selector: 'ocv-camera-selector-row',
	templateUrl: './camera-selector-row.component.html',
	styleUrls: ['./camera-selector-row.component.scss'],
})
export class OCVCameraSelectorRowComponent implements OnInit {
	@Input()
	mediaDevice: MediaDeviceInfo;

	constructor() {}

	ngOnInit() {}
}
