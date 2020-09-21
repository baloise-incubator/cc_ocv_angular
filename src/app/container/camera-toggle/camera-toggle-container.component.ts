import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { EntityCollectionService, EntityServices } from '@ngrx/data';

@Component({
	selector: 'ocv-camera-toggle-container',
	templateUrl: './camera-toggle-container.component.html',
	styleUrls: ['./camera-toggle-container.component.scss'],
})
export class OCVCameraToggleContainerComponent implements OnInit {
	constructor(private entityServices: EntityServices, private store: Store<any>) {}

	ngOnInit() {}
}
