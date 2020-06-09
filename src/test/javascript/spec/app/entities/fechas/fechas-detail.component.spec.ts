import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ExamenDanTestModule } from '../../../test.module';
import { FechasDetailComponent } from 'app/entities/fechas/fechas-detail.component';
import { Fechas } from 'app/shared/model/fechas.model';

describe('Component Tests', () => {
  describe('Fechas Management Detail Component', () => {
    let comp: FechasDetailComponent;
    let fixture: ComponentFixture<FechasDetailComponent>;
    const route = ({ data: of({ fechas: new Fechas(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ExamenDanTestModule],
        declarations: [FechasDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(FechasDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(FechasDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load fechas on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.fechas).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
