import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {DashboardModule} from './dashboard/dashboard.module';
import {StoreModule} from '@ngrx/store';
import {michaelIOAppReducer} from './store/michael-io-app.reducer';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {EffectsModule} from '@ngrx/effects';
import {PersonDataIntegrityEffects} from './effects/person-data-integrity.effects';
import {AngularFireModule} from '@angular/fire';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {firebaseConfig} from 'src/environments/environment';
import {NasaModule} from 'src/app/nasa/nasa.module';
import {RxjsModule} from 'src/app/rxjs/rxjs.module';
import {AngularModule} from 'src/app/angular/angular.module';
import {HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';
import {SubRouterModule} from './sub-router/sub-router.module';

import {MichaelsLibraryU92ac304Module} from 'michaels-library-u92ac304';
import { ResumeComponent } from './resume/resume.component';
import { NonBlockingAsynchronousProgrammingComponent } from './non-blocking-asynchronous-programming/non-blocking-asynchronous-programming.component';
import { CrossOriginCommunicationComponent } from './cross-origin-communication/cross-origin-communication.component';

@NgModule({
  declarations: [
    AppComponent,
    ResumeComponent,
    NonBlockingAsynchronousProgrammingComponent,
    CrossOriginCommunicationComponent,
  ],
  imports: [
    BrowserModule,
    DashboardModule,
    StoreModule.forRoot({people: michaelIOAppReducer}),
    // BrowserAnimationsModule,
    NoopAnimationsModule,
    EffectsModule.forRoot([PersonDataIntegrityEffects]),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    NasaModule,
    RxjsModule,
    AngularModule,
    HttpClientModule,
    // order matters with routes
    SubRouterModule,
    AppRoutingModule,
    MichaelsLibraryU92ac304Module,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
