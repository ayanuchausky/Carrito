import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IFechas } from 'app/shared/model/fechas.model';
import { FechasService } from './fechas.service';

@Component({
  templateUrl: './fechas-delete-dialog.component.html'
})
export class FechasDeleteDialogComponent {
  fechas?: IFechas;

  constructor(protected fechasService: FechasService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.fechasService.delete(id).subscribe(() => {
      this.eventManager.broadcast('fechasListModification');
      this.activeModal.close();
    });
  }
}
