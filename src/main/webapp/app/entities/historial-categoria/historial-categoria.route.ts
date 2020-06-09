import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IHistorialCategoria, HistorialCategoria } from 'app/shared/model/historial-categoria.model';
import { HistorialCategoriaService } from './historial-categoria.service';
import { HistorialCategoriaComponent } from './historial-categoria.component';
import { HistorialCategoriaDetailComponent } from './historial-categoria-detail.component';
import { HistorialCategoriaUpdateComponent } from './historial-categoria-update.component';

@Injectable({ providedIn: 'root' })
export class HistorialCategoriaResolve implements Resolve<IHistorialCategoria> {
  constructor(private service: HistorialCategoriaService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IHistorialCategoria> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((historialCategoria: HttpResponse<HistorialCategoria>) => {
          if (historialCategoria.body) {
            return of(historialCategoria.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new HistorialCategoria());
  }
}

export const historialCategoriaRoute: Routes = [
  {
    path: '',
    component: HistorialCategoriaComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'HistorialCategorias'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: HistorialCategoriaDetailComponent,
    resolve: {
      historialCategoria: HistorialCategoriaResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'HistorialCategorias'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: HistorialCategoriaUpdateComponent,
    resolve: {
      historialCategoria: HistorialCategoriaResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'HistorialCategorias'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: HistorialCategoriaUpdateComponent,
    resolve: {
      historialCategoria: HistorialCategoriaResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'HistorialCategorias'
    },
    canActivate: [UserRouteAccessService]
  }
];
