import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IProductoCantidad } from 'app/shared/model/producto-cantidad.model';
import { ProductoCantidadService } from './producto-cantidad.service';

@Component({
  templateUrl: './producto-cantidad-delete-dialog.component.html'
})
export class ProductoCantidadDeleteDialogComponent {
  productoCantidad?: IProductoCantidad;

  constructor(
    protected productoCantidadService: ProductoCantidadService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.productoCantidadService.delete(id).subscribe(() => {
      this.eventManager.broadcast('productoCantidadListModification');
      this.activeModal.close();
    });
  }
}
