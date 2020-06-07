import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'carrito',
        loadChildren: () => import('./carrito/carrito.module').then(m => m.ExamenDanaideCarritoModule)
      },
      {
        path: 'cliente',
        loadChildren: () => import('./cliente/cliente.module').then(m => m.ExamenDanaideClienteModule)
      },
      {
        path: 'fechas',
        loadChildren: () => import('./fechas/fechas.module').then(m => m.ExamenDanaideFechasModule)
      },
      {
        path: 'producto-cantidad',
        loadChildren: () => import('./producto-cantidad/producto-cantidad.module').then(m => m.ExamenDanaideProductoCantidadModule)
      },
      {
        path: 'producto',
        loadChildren: () => import('./producto/producto.module').then(m => m.ExamenDanaideProductoModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ]
})
export class ExamenDanaideEntityModule {}
