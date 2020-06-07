import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { ExamenDanaideTestModule } from '../../../test.module';
import { ProductoCantidadUpdateComponent } from 'app/entities/producto-cantidad/producto-cantidad-update.component';
import { ProductoCantidadService } from 'app/entities/producto-cantidad/producto-cantidad.service';
import { ProductoCantidad } from 'app/shared/model/producto-cantidad.model';

describe('Component Tests', () => {
  describe('ProductoCantidad Management Update Component', () => {
    let comp: ProductoCantidadUpdateComponent;
    let fixture: ComponentFixture<ProductoCantidadUpdateComponent>;
    let service: ProductoCantidadService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ExamenDanaideTestModule],
        declarations: [ProductoCantidadUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(ProductoCantidadUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ProductoCantidadUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ProductoCantidadService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new ProductoCantidad(123);
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
        const entity = new ProductoCantidad();
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
