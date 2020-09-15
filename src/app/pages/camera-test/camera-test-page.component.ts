import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectWNRYRouteId } from '@wnry/angular-lib';

@Component({
  selector: 'ocv-camera-test-page',
  templateUrl: './camera-test-page.component.html',
  styleUrls: ['./camera-test-page.component.scss']
})
export class OCVCameraTestPageComponent implements OnInit {

  title: string = 'camera-test';
  routeId$: Observable<any>;

  constructor(private store: Store<any>) { }

  ngOnInit() {
    this.routeId$ = this.store.pipe(
      select(selectWNRYRouteId)
    )
  }

}
