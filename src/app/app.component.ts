import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
	IWNRYNavItem,
	getWNRYMenuAll,
	treeToNestedSet,
	WNRYMenuSetMenu,
	WNRYUserLoginWithToken,
	WNRYUserInterfaceAppShortTitle,
	WNRYUserInterfaceAppTitle,
	WNRYUserInterfaceSessionPageTitle,
	WNRYUserInterfaceAppLogo,
} from '@wnry/angular-lib';
import { menu } from './store/menu/menu';

@Component({
	selector: 'ocv-root',
	templateUrl: 'app.component.html',
	styles: [],
})
export class AppComponent {
	menu$: Observable<IWNRYNavItem[]>;

	constructor(private store: Store<any>) {
		this.store.dispatch(new WNRYUserInterfaceAppShortTitle('OCV Cam'));
		this.store.dispatch(new WNRYUserInterfaceAppTitle('Open CV Camera'));
		this.store.dispatch(new WNRYUserInterfaceSessionPageTitle('Open CV Camera'));
		this.store.dispatch(new WNRYUserInterfaceAppLogo('/assets/cam-logo.png'));

		this.store.dispatch(new WNRYUserLoginWithToken());

		this.menu$ = this.store.pipe(select(getWNRYMenuAll));
		this.store.dispatch(new WNRYMenuSetMenu(treeToNestedSet(menu)));
	}
}
