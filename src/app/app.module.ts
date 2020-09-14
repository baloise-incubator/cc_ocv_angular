import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { WNRYRouterStoreModule, WNRYUserStoreModule, WNRYMenuStoreModule, WNRYUserInterfaceStoreModule, WNRYDataStoreModule, WNRYAdminLTE3LayoutModule, WNRYSessionPagesLayoutModule, WNRYHttp404PageModule } from '@wnry/angular-lib';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { RightHeadertModule } from './components/right-header/right-header.module';
import { environment } from '../environments/environment';
import { ServiceWorkerModule } from '@angular/service-worker';
import { entityConfig } from './store/data/entity-metadata';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    WNRYRouterStoreModule,
    WNRYUserStoreModule.forRoot({api: "api/jsonrpc.php",redirect:"session/login"}),
    WNRYMenuStoreModule,
    WNRYUserInterfaceStoreModule.forRoot({}),
    WNRYDataStoreModule.forRoot(entityConfig),
    WNRYAdminLTE3LayoutModule,
    WNRYSessionPagesLayoutModule,
    WNRYHttp404PageModule,
    NgbModule,
    RightHeadertModule,
    environment.production ? [] : StoreDevtoolsModule.instrument({ name: "WNRY Angular Demo", maxAge: 40 }),
    ServiceWorkerModule.register("/ngsw-worker.js", { enabled: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
