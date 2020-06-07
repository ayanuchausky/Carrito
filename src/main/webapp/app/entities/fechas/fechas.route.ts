import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IFechas, Fechas } from 'app/shared/model/fechas.model';
import { FechasService } from './fechas.service';
import { FechasComponent } from './fechas.component';
import { FechasDetailComponent } from './fechas-detail.component';
import { FechasUpdateComponent } from './fechas-update.component';

@Injectable({ providedIn: 'root' })
export class FechasResolve implements Resolve<IFechas> {
  constructor(private service: FechasService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IFechas> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((fechas: HttpResponse<Fechas>) => {
          if (fechas.body) {
            return of(fechas.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Fechas());
  }
}

export const fechasRoute: Routes = [
  {
    path: '',
    component: FechasComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Fechas'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: FechasDetailComponent,
    resolve: {
      fechas: FechasResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Fechas'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: FechasUpdateComponent,
    resolve: {
      fechas: FechasResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Fechas'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: FechasUpdateComponent,
    resolve: {
      fechas: FechasResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Fechas'
    },
    canActivate: [UserRouteAccessService]
  }
];
