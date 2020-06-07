import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IFechas } from 'app/shared/model/fechas.model';
import { FechasService } from './fechas.service';
import { FechasDeleteDialogComponent } from './fechas-delete-dialog.component';

@Component({
  selector: 'jhi-fechas',
  templateUrl: './fechas.component.html'
})
export class FechasComponent implements OnInit, OnDestroy {
  fechas?: IFechas[];
  eventSubscriber?: Subscription;

  constructor(protected fechasService: FechasService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.fechasService.query().subscribe((res: HttpResponse<IFechas[]>) => (this.fechas = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInFechas();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IFechas): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInFechas(): void {
    this.eventSubscriber = this.eventManager.subscribe('fechasListModification', () => this.loadAll());
  }

  delete(fechas: IFechas): void {
    const modalRef = this.modalService.open(FechasDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.fechas = fechas;
  }
}
