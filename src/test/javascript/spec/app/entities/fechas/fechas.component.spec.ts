import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ExamenDanaideTestModule } from '../../../test.module';
import { FechasComponent } from 'app/entities/fechas/fechas.component';
import { FechasService } from 'app/entities/fechas/fechas.service';
import { Fechas } from 'app/shared/model/fechas.model';

describe('Component Tests', () => {
  describe('Fechas Management Component', () => {
    let comp: FechasComponent;
    let fixture: ComponentFixture<FechasComponent>;
    let service: FechasService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ExamenDanaideTestModule],
        declarations: [FechasComponent]
      })
        .overrideTemplate(FechasComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(FechasComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(FechasService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Fechas(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.fechas && comp.fechas[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
