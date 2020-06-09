import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IFechas, Fechas } from 'app/shared/model/fechas.model';
import { FechasService } from './fechas.service';

@Component({
  selector: 'jhi-fechas-update',
  templateUrl: './fechas-update.component.html'
})
export class FechasUpdateComponent implements OnInit {
  isSaving = false;
  fechaDp: any;

  editForm = this.fb.group({
    id: [],
    fecha: []
  });

  constructor(protected fechasService: FechasService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ fechas }) => {
      this.updateForm(fechas);
    });
  }

  updateForm(fechas: IFechas): void {
    this.editForm.patchValue({
      id: fechas.id,
      fecha: fechas.fecha
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const fechas = this.createFromForm();
    if (fechas.id !== undefined) {
      this.subscribeToSaveResponse(this.fechasService.update(fechas));
    } else {
      this.subscribeToSaveResponse(this.fechasService.create(fechas));
    }
  }

  private createFromForm(): IFechas {
    return {
      ...new Fechas(),
      id: this.editForm.get(['id'])!.value,
      fecha: this.editForm.get(['fecha'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IFechas>>): void {
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
}
