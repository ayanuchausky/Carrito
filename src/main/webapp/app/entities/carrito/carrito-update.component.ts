import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ICarrito, Carrito } from 'app/shared/model/carrito.model';
import { CarritoService } from './carrito.service';
import { ICliente } from 'app/shared/model/cliente.model';
import { ClienteService } from 'app/entities/cliente/cliente.service';

@Component({
  selector: 'jhi-carrito-update',
  templateUrl: './carrito-update.component.html'
})
export class CarritoUpdateComponent implements OnInit {
  isSaving = false;
  clientes: ICliente[] = [];
  fechaDp: any;

  editForm = this.fb.group({
    id: [],
    tipo: [],
    total: [],
    fecha: [],
    cliente: []
  });

  constructor(
    protected carritoService: CarritoService,
    protected clienteService: ClienteService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ carrito }) => {
      this.updateForm(carrito);

      this.clienteService.query().subscribe((res: HttpResponse<ICliente[]>) => (this.clientes = res.body || []));
    });
  }

  updateForm(carrito: ICarrito): void {
    this.editForm.patchValue({
      id: carrito.id,
      tipo: carrito.tipo,
      total: carrito.total,
      fecha: carrito.fecha,
      cliente: carrito.cliente
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const carrito = this.createFromForm();
    if (carrito.id !== undefined) {
      this.subscribeToSaveResponse(this.carritoService.update(carrito));
    } else {
      this.subscribeToSaveResponse(this.carritoService.create(carrito));
    }
  }

  private createFromForm(): ICarrito {
    return {
      ...new Carrito(),
      id: this.editForm.get(['id'])!.value,
      tipo: this.editForm.get(['tipo'])!.value,
      total: this.editForm.get(['total'])!.value,
      fecha: this.editForm.get(['fecha'])!.value,
      cliente: this.editForm.get(['cliente'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICarrito>>): void {
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

  trackById(index: number, item: ICliente): any {
    return item.id;
  }
}
