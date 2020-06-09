import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { ExamenDanTestModule } from '../../../test.module';
import { MockEventManager } from '../../../helpers/mock-event-manager.service';
import { MockActiveModal } from '../../../helpers/mock-active-modal.service';
import { HistorialCategoriaDeleteDialogComponent } from 'app/entities/historial-categoria/historial-categoria-delete-dialog.component';
import { HistorialCategoriaService } from 'app/entities/historial-categoria/historial-categoria.service';

describe('Component Tests', () => {
  describe('HistorialCategoria Management Delete Component', () => {
    let comp: HistorialCategoriaDeleteDialogComponent;
    let fixture: ComponentFixture<HistorialCategoriaDeleteDialogComponent>;
    let service: HistorialCategoriaService;
    let mockEventManager: MockEventManager;
    let mockActiveModal: MockActiveModal;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ExamenDanTestModule],
        declarations: [HistorialCategoriaDeleteDialogComponent]
      })
        .overrideTemplate(HistorialCategoriaDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(HistorialCategoriaDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(HistorialCategoriaService);
      mockEventManager = TestBed.get(JhiEventManager);
      mockActiveModal = TestBed.get(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete(123);
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith(123);
          expect(mockActiveModal.closeSpy).toHaveBeenCalled();
          expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
        })
      ));

      it('Should not call delete service on clear', () => {
        // GIVEN
        spyOn(service, 'delete');

        // WHEN
        comp.cancel();

        // THEN
        expect(service.delete).not.toHaveBeenCalled();
        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
      });
    });
  });
});
