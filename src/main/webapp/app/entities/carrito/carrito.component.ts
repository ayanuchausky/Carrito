import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ICarrito } from 'app/shared/model/carrito.model';
import { CarritoService } from './carrito.service';
import { CarritoDeleteDialogComponent } from './carrito-delete-dialog.component';

@Component({
  selector: 'jhi-carrito',
  templateUrl: './carrito.component.html'
})
export class CarritoComponent implements OnInit, OnDestroy {
  carritos?: ICarrito[];
  eventSubscriber?: Subscription;

  constructor(protected carritoService: CarritoService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.carritoService.query().subscribe((res: HttpResponse<ICarrito[]>) => (this.carritos = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInCarritos();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ICarrito): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInCarritos(): void {
    this.eventSubscriber = this.eventManager.subscribe('carritoListModification', () => this.loadAll());
  }

  delete(carrito: ICarrito): void {
    const modalRef = this.modalService.open(CarritoDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.carrito = carrito;
  }
}
