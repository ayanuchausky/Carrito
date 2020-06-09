import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IHistorialCategoria } from 'app/shared/model/historial-categoria.model';

@Component({
  selector: 'jhi-historial-categoria-detail',
  templateUrl: './historial-categoria-detail.component.html'
})
export class HistorialCategoriaDetailComponent implements OnInit {
  historialCategoria: IHistorialCategoria | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ historialCategoria }) => (this.historialCategoria = historialCategoria));
  }

  previousState(): void {
    window.history.back();
  }
}
