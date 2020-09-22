import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { EntityCollectionService, EntityServices } from '@ngrx/data';

@Component({
	selector: 'ocv-facedetect-opencv-container',
	templateUrl: './facedetect-opencv-container.component.html',
	styleUrls: ['./facedetect-opencv-container.component.scss'],
})
export class OCVFacedetectOpenCVContainerComponent implements OnInit {
	constructor(private entityServices: EntityServices, private store: Store<any>) {}

	ngOnInit() {}
}
