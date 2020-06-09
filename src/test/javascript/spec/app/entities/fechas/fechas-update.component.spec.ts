import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { ExamenDanTestModule } from '../../../test.module';
import { FechasUpdateComponent } from 'app/entities/fechas/fechas-update.component';
import { FechasService } from 'app/entities/fechas/fechas.service';
import { Fechas } from 'app/shared/model/fechas.model';

describe('Component Tests', () => {
  describe('Fechas Management Update Component', () => {
    let comp: FechasUpdateComponent;
    let fixture: ComponentFixture<FechasUpdateComponent>;
    let service: FechasService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ExamenDanTestModule],
        declarations: [FechasUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(FechasUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(FechasUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(FechasService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Fechas(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new Fechas();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
