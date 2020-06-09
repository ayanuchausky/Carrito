import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ExamenDanSharedModule } from 'app/shared/shared.module';
import { CarritoComponent } from './carrito.component';
import { CarritoDetailComponent } from './carrito-detail.component';
import { CarritoUpdateComponent } from './carrito-update.component';
import { CarritoDeleteDialogComponent } from './carrito-delete-dialog.component';
import { carritoRoute } from './carrito.route';

@NgModule({
  imports: [ExamenDanSharedModule, RouterModule.forChild(carritoRoute)],
  declarations: [CarritoComponent, CarritoDetailComponent, CarritoUpdateComponent, CarritoDeleteDialogComponent],
  entryComponents: [CarritoDeleteDialogComponent]
})
export class ExamenDanCarritoModule {}
