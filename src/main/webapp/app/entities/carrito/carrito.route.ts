import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ICarrito, Carrito } from 'app/shared/model/carrito.model';
import { CarritoService } from './carrito.service';
import { CarritoComponent } from './carrito.component';
import { CarritoDetailComponent } from './carrito-detail.component';
import { CarritoUpdateComponent } from './carrito-update.component';

@Injectable({ providedIn: 'root' })
export class CarritoResolve implements Resolve<ICarrito> {
  constructor(private service: CarritoService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICarrito> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((carrito: HttpResponse<Carrito>) => {
          if (carrito.body) {
            return of(carrito.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Carrito());
  }
}

export const carritoRoute: Routes = [
  {
    path: '',
    component: CarritoComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Carritos'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: CarritoDetailComponent,
    resolve: {
      carrito: CarritoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Carritos'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: CarritoUpdateComponent,
    resolve: {
      carrito: CarritoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Carritos'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: CarritoUpdateComponent,
    resolve: {
      carrito: CarritoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Carritos'
    },
    canActivate: [UserRouteAccessService]
  }
];
