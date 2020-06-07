import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ExamenDanaideTestModule } from '../../../test.module';
import { CarritoComponent } from 'app/entities/carrito/carrito.component';
import { CarritoService } from 'app/entities/carrito/carrito.service';
import { Carrito } from 'app/shared/model/carrito.model';

describe('Component Tests', () => {
  describe('Carrito Management Component', () => {
    let comp: CarritoComponent;
    let fixture: ComponentFixture<CarritoComponent>;
    let service: CarritoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ExamenDanaideTestModule],
        declarations: [CarritoComponent]
      })
        .overrideTemplate(CarritoComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CarritoComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CarritoService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Carrito(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.carritos && comp.carritos[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
