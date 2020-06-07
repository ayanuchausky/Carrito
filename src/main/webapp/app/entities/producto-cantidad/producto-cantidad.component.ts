import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IProductoCantidad } from 'app/shared/model/producto-cantidad.model';
import { ProductoCantidadService } from './producto-cantidad.service';
import { ProductoCantidadDeleteDialogComponent } from './producto-cantidad-delete-dialog.component';

@Component({
  selector: 'jhi-producto-cantidad',
  templateUrl: './producto-cantidad.component.html'
})
export class ProductoCantidadComponent implements OnInit, OnDestroy {
  productoCantidads?: IProductoCantidad[];
  eventSubscriber?: Subscription;

  constructor(
    protected productoCantidadService: ProductoCantidadService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.productoCantidadService.query().subscribe((res: HttpResponse<IProductoCantidad[]>) => (this.productoCantidads = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInProductoCantidads();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IProductoCantidad): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInProductoCantidads(): void {
    this.eventSubscriber = this.eventManager.subscribe('productoCantidadListModification', () => this.loadAll());
  }

  delete(productoCantidad: IProductoCantidad): void {
    const modalRef = this.modalService.open(ProductoCantidadDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.productoCantidad = productoCantidad;
  }
}
