import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DpfComponent } from './pages/dpf/dpf.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { SimuladorCreditoComponent } from './simulador-credito.component';
import { SimuladorCreditoRoutingModule } from './simulador-credito-routing.module';
import { TurnosComponent } from './pages/turnos/turnos.component';
import { AhorroFuturoComponent } from './pages/ahorro-futuro/ahorro-futuro.component';
import { CreditosComponent } from './pages/creditos/creditos.component';
import { MatTableModule } from '@angular/material/table';
import { MatRadioModule } from '@angular/material/radio';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MAT_DATE_LOCALE, MAT_DATE_FORMATS, DateAdapter } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { HttpClientModule } from '@angular/common/http';
import { FirestoreService } from 'src/app/shared/services/firestore.service';
import {MatTooltipModule} from '@angular/material/tooltip';


@NgModule({
  declarations: [
    SimuladorCreditoComponent,
    DpfComponent,
    TurnosComponent,
    AhorroFuturoComponent,
    CreditosComponent, 
  ],
  imports: [
    CommonModule,
    SimuladorCreditoRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    MatButtonModule,
    MatTableModule,
    MatRadioModule,
    ScrollingModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDividerModule,
    HttpClientModule,
    MatTooltipModule
    
    
    

  ], 
  providers: [
    MatDatepickerModule,
    MatNativeDateModule,
    { provide: MAT_DATE_LOCALE, useValue: 'es-EC' },
    FirestoreService
  

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SimuladorCreditoModule { }
