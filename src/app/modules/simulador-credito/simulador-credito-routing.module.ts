import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SimuladorCreditoComponent } from './simulador-credito.component';
import { DpfComponent } from './pages/dpf/dpf.component';
import { TurnosComponent } from './pages/turnos/turnos.component';
import { PoliticasComponent } from './pages/politicas/politicas-privacidad.component';


const routes: Routes = [
  {
    path: '',
    component: SimuladorCreditoComponent, children: [
      { path: '', redirectTo: 'simulador', pathMatch: 'full' },
      { path: 'simulador', component: DpfComponent },
      { path: 'turnos', component: TurnosComponent },
      { path: 'politicas', component: PoliticasComponent }
    ]
  },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class SimuladorCreditoRoutingModule { }
