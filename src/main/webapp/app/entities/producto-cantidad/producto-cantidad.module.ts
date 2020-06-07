import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ExamenDanaideSharedModule } from 'app/shared/shared.module';
import { ProductoCantidadComponent } from './producto-cantidad.component';
import { ProductoCantidadDetailComponent } from './producto-cantidad-detail.component';
import { ProductoCantidadUpdateComponent } from './producto-cantidad-update.component';
import { ProductoCantidadDeleteDialogComponent } from './producto-cantidad-delete-dialog.component';
import { productoCantidadRoute } from './producto-cantidad.route';

@NgModule({
  imports: [ExamenDanaideSharedModule, RouterModule.forChild(productoCantidadRoute)],
  declarations: [
    ProductoCantidadComponent,
    ProductoCantidadDetailComponent,
    ProductoCantidadUpdateComponent,
    ProductoCantidadDeleteDialogComponent
  ],
  entryComponents: [ProductoCantidadDeleteDialogComponent]
})
export class ExamenDanaideProductoCantidadModule {}
