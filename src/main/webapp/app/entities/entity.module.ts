import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'carrito',
        loadChildren: () => import('./carrito/carrito.module').then(m => m.ExamenDanCarritoModule)
      },
      {
        path: 'cliente',
        loadChildren: () => import('./cliente/cliente.module').then(m => m.ExamenDanClienteModule)
      },
      {
        path: 'fechas',
        loadChildren: () => import('./fechas/fechas.module').then(m => m.ExamenDanFechasModule)
      },
      {
        path: 'producto-cantidad',
        loadChildren: () => import('./producto-cantidad/producto-cantidad.module').then(m => m.ExamenDanProductoCantidadModule)
      },
      {
        path: 'producto',
        loadChildren: () => import('./producto/producto.module').then(m => m.ExamenDanProductoModule)
      },
      {
        path: 'historial-categoria',
        loadChildren: () => import('./historial-categoria/historial-categoria.module').then(m => m.ExamenDanHistorialCategoriaModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ]
})
export class ExamenDanEntityModule {}
