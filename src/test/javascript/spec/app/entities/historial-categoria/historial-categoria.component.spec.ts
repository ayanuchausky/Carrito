import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ExamenDanTestModule } from '../../../test.module';
import { HistorialCategoriaComponent } from 'app/entities/historial-categoria/historial-categoria.component';
import { HistorialCategoriaService } from 'app/entities/historial-categoria/historial-categoria.service';
import { HistorialCategoria } from 'app/shared/model/historial-categoria.model';

describe('Component Tests', () => {
  describe('HistorialCategoria Management Component', () => {
    let comp: HistorialCategoriaComponent;
    let fixture: ComponentFixture<HistorialCategoriaComponent>;
    let service: HistorialCategoriaService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ExamenDanTestModule],
        declarations: [HistorialCategoriaComponent]
      })
        .overrideTemplate(HistorialCategoriaComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(HistorialCategoriaComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(HistorialCategoriaService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new HistorialCategoria(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.historialCategorias && comp.historialCategorias[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
