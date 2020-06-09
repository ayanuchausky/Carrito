import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IHistorialCategoria } from 'app/shared/model/historial-categoria.model';
import { HistorialCategoriaService } from './historial-categoria.service';

@Component({
  templateUrl: './historial-categoria-delete-dialog.component.html'
})
export class HistorialCategoriaDeleteDialogComponent {
  historialCategoria?: IHistorialCategoria;

  constructor(
    protected historialCategoriaService: HistorialCategoriaService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.historialCategoriaService.delete(id).subscribe(() => {
      this.eventManager.broadcast('historialCategoriaListModification');
      this.activeModal.close();
    });
  }
}
