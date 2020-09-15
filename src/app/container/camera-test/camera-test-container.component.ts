import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { EntityCollectionService, EntityServices } from '@ngrx/data';

@Component({
  selector: 'ocv-camera-test-container',
  templateUrl: './camera-test-container.component.html',
  styleUrls: ['./camera-test-container.component.scss']
})
export class OCVCameraTestContainerComponent implements OnInit {

  constructor(private entityServices: EntityServices, private store: Store<any>) { }

  ngOnInit() {
  }

}
