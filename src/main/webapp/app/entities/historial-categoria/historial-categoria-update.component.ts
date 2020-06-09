import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IHistorialCategoria, HistorialCategoria } from 'app/shared/model/historial-categoria.model';
import { HistorialCategoriaService } from './historial-categoria.service';
import { ICliente } from 'app/shared/model/cliente.model';
import { ClienteService } from 'app/entities/cliente/cliente.service';

@Component({
  selector: 'jhi-historial-categoria-update',
  templateUrl: './historial-categoria-update.component.html'
})
export class HistorialCategoriaUpdateComponent implements OnInit {
  isSaving = false;
  clientes: ICliente[] = [];

  editForm = this.fb.group({
    id: [],
    mes: [],
    seConvierteEn: [],
    cliente: []
  });

  constructor(
    protected historialCategoriaService: HistorialCategoriaService,
    protected clienteService: ClienteService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ historialCategoria }) => {
      this.updateForm(historialCategoria);

      this.clienteService.query().subscribe((res: HttpResponse<ICliente[]>) => (this.clientes = res.body || []));
    });
  }

  updateForm(historialCategoria: IHistorialCategoria): void {
    this.editForm.patchValue({
      id: historialCategoria.id,
      mes: historialCategoria.mes,
      seConvierteEn: historialCategoria.seConvierteEn,
      cliente: historialCategoria.cliente
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const historialCategoria = this.createFromForm();
    if (historialCategoria.id !== undefined) {
      this.subscribeToSaveResponse(this.historialCategoriaService.update(historialCategoria));
    } else {
      this.subscribeToSaveResponse(this.historialCategoriaService.create(historialCategoria));
    }
  }

  private createFromForm(): IHistorialCategoria {
    return {
      ...new HistorialCategoria(),
      id: this.editForm.get(['id'])!.value,
      mes: this.editForm.get(['mes'])!.value,
      seConvierteEn: this.editForm.get(['seConvierteEn'])!.value,
      cliente: this.editForm.get(['cliente'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IHistorialCategoria>>): void {
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
