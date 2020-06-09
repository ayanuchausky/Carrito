import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ExamenDanTestModule } from '../../../test.module';
import { HistorialCategoriaDetailComponent } from 'app/entities/historial-categoria/historial-categoria-detail.component';
import { HistorialCategoria } from 'app/shared/model/historial-categoria.model';

describe('Component Tests', () => {
  describe('HistorialCategoria Management Detail Component', () => {
    let comp: HistorialCategoriaDetailComponent;
    let fixture: ComponentFixture<HistorialCategoriaDetailComponent>;
    const route = ({ data: of({ historialCategoria: new HistorialCategoria(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ExamenDanTestModule],
        declarations: [HistorialCategoriaDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(HistorialCategoriaDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(HistorialCategoriaDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load historialCategoria on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.historialCategoria).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
