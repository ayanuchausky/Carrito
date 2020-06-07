import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IProductoCantidad } from 'app/shared/model/producto-cantidad.model';

@Component({
  selector: 'jhi-producto-cantidad-detail',
  templateUrl: './producto-cantidad-detail.component.html'
})
export class ProductoCantidadDetailComponent implements OnInit {
  productoCantidad: IProductoCantidad | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ productoCantidad }) => (this.productoCantidad = productoCantidad));
  }

  previousState(): void {
    window.history.back();
  }
}
