import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { ExamenDanTestModule } from '../../../test.module';
import { HistorialCategoriaUpdateComponent } from 'app/entities/historial-categoria/historial-categoria-update.component';
import { HistorialCategoriaService } from 'app/entities/historial-categoria/historial-categoria.service';
import { HistorialCategoria } from 'app/shared/model/historial-categoria.model';

describe('Component Tests', () => {
  describe('HistorialCategoria Management Update Component', () => {
    let comp: HistorialCategoriaUpdateComponent;
    let fixture: ComponentFixture<HistorialCategoriaUpdateComponent>;
    let service: HistorialCategoriaService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ExamenDanTestModule],
        declarations: [HistorialCategoriaUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(HistorialCategoriaUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(HistorialCategoriaUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(HistorialCategoriaService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new HistorialCategoria(123);
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
        const entity = new HistorialCategoria();
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
