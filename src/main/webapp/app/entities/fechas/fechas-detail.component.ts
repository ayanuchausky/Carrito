import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IFechas } from 'app/shared/model/fechas.model';

@Component({
  selector: 'jhi-fechas-detail',
  templateUrl: './fechas-detail.component.html'
})
export class FechasDetailComponent implements OnInit {
  fechas: IFechas | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ fechas }) => (this.fechas = fechas));
  }

  previousState(): void {
    window.history.back();
  }
}
