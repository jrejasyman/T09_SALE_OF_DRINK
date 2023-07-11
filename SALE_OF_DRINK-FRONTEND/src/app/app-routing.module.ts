import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonaComponent } from './persona/persona.component';
import { VentaComponent } from './venta/venta.component';
import { ProductoComponent } from './producto/producto.component';
import { VentadetalleComponent } from './ventadetalle/ventadetalle.component';

const routes: Routes = [
  {
    path: 'persona',
    component: PersonaComponent
  },
  {
    path: 'venta',
    component: VentaComponent
  },
  {
    path: 'producto',
    component: ProductoComponent
  },
  {
    path: 'ventadetalle',
    component: VentadetalleComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
