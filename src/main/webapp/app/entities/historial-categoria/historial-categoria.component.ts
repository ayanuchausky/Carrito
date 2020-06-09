import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IHistorialCategoria } from 'app/shared/model/historial-categoria.model';
import { HistorialCategoriaService } from './historial-categoria.service';
import { HistorialCategoriaDeleteDialogComponent } from './historial-categoria-delete-dialog.component';

@Component({
  selector: 'jhi-historial-categoria',
  templateUrl: './historial-categoria.component.html'
})
export class HistorialCategoriaComponent implements OnInit, OnDestroy {
  historialCategorias?: IHistorialCategoria[];
  eventSubscriber?: Subscription;

  constructor(
    protected historialCategoriaService: HistorialCategoriaService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.historialCategoriaService
      .query()
      .subscribe((res: HttpResponse<IHistorialCategoria[]>) => (this.historialCategorias = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInHistorialCategorias();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IHistorialCategoria): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInHistorialCategorias(): void {
    this.eventSubscriber = this.eventManager.subscribe('historialCategoriaListModification', () => this.loadAll());
  }

  delete(historialCategoria: IHistorialCategoria): void {
    const modalRef = this.modalService.open(HistorialCategoriaDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.historialCategoria = historialCategoria;
  }
}
