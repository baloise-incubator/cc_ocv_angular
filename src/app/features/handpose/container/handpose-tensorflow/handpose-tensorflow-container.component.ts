import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { EntityCollectionService, EntityServices } from '@ngrx/data';

@Component({
	selector: 'ocv-handpose-tensorflow-container',
	templateUrl: './handpose-tensorflow-container.component.html',
	styleUrls: ['./handpose-tensorflow-container.component.scss'],
})
export class OCVHandposeTensorFlowContainerComponent implements OnInit {
	@Input()
	camera: MediaDeviceInfo;

	constructor(private entityServices: EntityServices, private store: Store<any>) {}

	ngOnInit() {}
}
