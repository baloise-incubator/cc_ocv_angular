import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { EntityCollectionService, EntityServices } from '@ngrx/data';

@Component({
	selector: 'ocv-mymodel-tensorflow-container',
	templateUrl: './mymodel-tensorflow-container.component.html',
	styleUrls: ['./mymodel-tensorflow-container.component.scss'],
})
export class OCVMyModelTensorFlowContainerComponent implements OnInit {
	@Input()
	camera: MediaDeviceInfo;

	constructor(private entityServices: EntityServices, private store: Store<any>) {}

	ngOnInit() {}
}
