import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ExamenDanaideTestModule } from '../../../test.module';
import { ProductoCantidadComponent } from 'app/entities/producto-cantidad/producto-cantidad.component';
import { ProductoCantidadService } from 'app/entities/producto-cantidad/producto-cantidad.service';
import { ProductoCantidad } from 'app/shared/model/producto-cantidad.model';

describe('Component Tests', () => {
  describe('ProductoCantidad Management Component', () => {
    let comp: ProductoCantidadComponent;
    let fixture: ComponentFixture<ProductoCantidadComponent>;
    let service: ProductoCantidadService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ExamenDanaideTestModule],
        declarations: [ProductoCantidadComponent]
      })
        .overrideTemplate(ProductoCantidadComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ProductoCantidadComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ProductoCantidadService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new ProductoCantidad(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.productoCantidads && comp.productoCantidads[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
