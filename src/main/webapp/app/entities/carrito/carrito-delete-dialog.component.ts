import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICarrito } from 'app/shared/model/carrito.model';
import { CarritoService } from './carrito.service';

@Component({
  templateUrl: './carrito-delete-dialog.component.html'
})
export class CarritoDeleteDialogComponent {
  carrito?: ICarrito;

  constructor(protected carritoService: CarritoService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.carritoService.delete(id).subscribe(() => {
      this.eventManager.broadcast('carritoListModification');
      this.activeModal.close();
    });
  }
}
