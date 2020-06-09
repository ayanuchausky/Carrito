import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ExamenDanSharedModule } from 'app/shared/shared.module';
import { HistorialCategoriaComponent } from './historial-categoria.component';
import { HistorialCategoriaDetailComponent } from './historial-categoria-detail.component';
import { HistorialCategoriaUpdateComponent } from './historial-categoria-update.component';
import { HistorialCategoriaDeleteDialogComponent } from './historial-categoria-delete-dialog.component';
import { historialCategoriaRoute } from './historial-categoria.route';

@NgModule({
  imports: [ExamenDanSharedModule, RouterModule.forChild(historialCategoriaRoute)],
  declarations: [
    HistorialCategoriaComponent,
    HistorialCategoriaDetailComponent,
    HistorialCategoriaUpdateComponent,
    HistorialCategoriaDeleteDialogComponent
  ],
  entryComponents: [HistorialCategoriaDeleteDialogComponent]
})
export class ExamenDanHistorialCategoriaModule {}
