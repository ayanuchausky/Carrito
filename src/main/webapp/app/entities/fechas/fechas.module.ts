import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ExamenDanSharedModule } from 'app/shared/shared.module';
import { FechasComponent } from './fechas.component';
import { FechasDetailComponent } from './fechas-detail.component';
import { FechasUpdateComponent } from './fechas-update.component';
import { FechasDeleteDialogComponent } from './fechas-delete-dialog.component';
import { fechasRoute } from './fechas.route';

@NgModule({
  imports: [ExamenDanSharedModule, RouterModule.forChild(fechasRoute)],
  declarations: [FechasComponent, FechasDetailComponent, FechasUpdateComponent, FechasDeleteDialogComponent],
  entryComponents: [FechasDeleteDialogComponent]
})
export class ExamenDanFechasModule {}
