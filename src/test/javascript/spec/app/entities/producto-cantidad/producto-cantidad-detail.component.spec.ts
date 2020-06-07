import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ExamenDanaideTestModule } from '../../../test.module';
import { ProductoCantidadDetailComponent } from 'app/entities/producto-cantidad/producto-cantidad-detail.component';
import { ProductoCantidad } from 'app/shared/model/producto-cantidad.model';

describe('Component Tests', () => {
  describe('ProductoCantidad Management Detail Component', () => {
    let comp: ProductoCantidadDetailComponent;
    let fixture: ComponentFixture<ProductoCantidadDetailComponent>;
    const route = ({ data: of({ productoCantidad: new ProductoCantidad(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ExamenDanaideTestModule],
        declarations: [ProductoCantidadDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(ProductoCantidadDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ProductoCantidadDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load productoCantidad on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.productoCantidad).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
