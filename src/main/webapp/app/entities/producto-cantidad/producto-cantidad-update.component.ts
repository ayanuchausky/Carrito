import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IProductoCantidad, ProductoCantidad } from 'app/shared/model/producto-cantidad.model';
import { ProductoCantidadService } from './producto-cantidad.service';
import { IProducto } from 'app/shared/model/producto.model';
import { ProductoService } from 'app/entities/producto/producto.service';
import { ICarrito } from 'app/shared/model/carrito.model';
import { CarritoService } from 'app/entities/carrito/carrito.service';

type SelectableEntity = IProducto | ICarrito;

@Component({
  selector: 'jhi-producto-cantidad-update',
  templateUrl: './producto-cantidad-update.component.html'
})
export class ProductoCantidadUpdateComponent implements OnInit {
  isSaving = false;
  productos: IProducto[] = [];
  carritos: ICarrito[] = [];

  editForm = this.fb.group({
    id: [],
    cantidad: [],
    producto: [],
    carrito: []
  });

  constructor(
    protected productoCantidadService: ProductoCantidadService,
    protected productoService: ProductoService,
    protected carritoService: CarritoService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ productoCantidad }) => {
      this.updateForm(productoCantidad);

      this.productoService
        .query({ filter: 'productocantidad-is-null' })
        .pipe(
          map((res: HttpResponse<IProducto[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IProducto[]) => {
          if (!productoCantidad.producto || !productoCantidad.producto.id) {
            this.productos = resBody;
          } else {
            this.productoService
              .find(productoCantidad.producto.id)
              .pipe(
                map((subRes: HttpResponse<IProducto>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IProducto[]) => (this.productos = concatRes));
          }
        });

      this.carritoService.query().subscribe((res: HttpResponse<ICarrito[]>) => (this.carritos = res.body || []));
    });
  }

  updateForm(productoCantidad: IProductoCantidad): void {
    this.editForm.patchValue({
      id: productoCantidad.id,
      cantidad: productoCantidad.cantidad,
      producto: productoCantidad.producto,
      carrito: productoCantidad.carrito
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const productoCantidad = this.createFromForm();
    if (productoCantidad.id !== undefined) {
      this.subscribeToSaveResponse(this.productoCantidadService.update(productoCantidad));
    } else {
      this.subscribeToSaveResponse(this.productoCantidadService.create(productoCantidad));
    }
  }

  private createFromForm(): IProductoCantidad {
    return {
      ...new ProductoCantidad(),
      id: this.editForm.get(['id'])!.value,
      cantidad: this.editForm.get(['cantidad'])!.value,
      producto: this.editForm.get(['producto'])!.value,
      carrito: this.editForm.get(['carrito'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IProductoCantidad>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }
}
