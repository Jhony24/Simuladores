import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { SimuladorCreditoModule } from './modules/simulador-credito/simulador-credito.module';

import { SimuladorCreditoRoutingModule } from './modules/simulador-credito/simulador-credito-routing.module';
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule } from '@angular/fire/storage';

import { environment } from '../environments/environment';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    SimuladorCreditoModule,
    SimuladorCreditoRoutingModule,
    AngularFireStorageModule,
    FormsModule
  ],
  /*exports: [
    FormsModule
  ],*/
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'es-EC' }],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
