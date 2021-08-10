import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',

    loadChildren: () => import('./modules/simulador-credito/simulador-credito.module').then(m => m.SimuladorCreditoModule),

  },
 /* {
    path: 'turnos',

    loadChildren: () => import('./modules/turnos/turnos.module' ).then(m => m.TurnosModule),

  },
  */

 
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true }) ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
