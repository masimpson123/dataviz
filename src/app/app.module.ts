import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { StoreModule } from '@ngrx/store';
import { michaelIOAppReducer } from './store/michael-io-app.reducer';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { PersonDataIntegrityEffects } from './effects/person-data-integrity.effects';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { firebaseConfig } from 'src/environments/environment';
import { NasaModule } from 'src/app/nasa/nasa.module';
import { RxjsModule } from 'src/app/rxjs/rxjs.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    DashboardModule,
    StoreModule.forRoot({ people: michaelIOAppReducer }),
    // BrowserAnimationsModule,
    NoopAnimationsModule,
    EffectsModule.forRoot([PersonDataIntegrityEffects]),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    NasaModule,
    RxjsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
