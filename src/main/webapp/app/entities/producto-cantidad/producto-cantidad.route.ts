import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IProductoCantidad, ProductoCantidad } from 'app/shared/model/producto-cantidad.model';
import { ProductoCantidadService } from './producto-cantidad.service';
import { ProductoCantidadComponent } from './producto-cantidad.component';
import { ProductoCantidadDetailComponent } from './producto-cantidad-detail.component';
import { ProductoCantidadUpdateComponent } from './producto-cantidad-update.component';

@Injectable({ providedIn: 'root' })
export class ProductoCantidadResolve implements Resolve<IProductoCantidad> {
  constructor(private service: ProductoCantidadService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IProductoCantidad> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((productoCantidad: HttpResponse<ProductoCantidad>) => {
          if (productoCantidad.body) {
            return of(productoCantidad.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new ProductoCantidad());
  }
}

export const productoCantidadRoute: Routes = [
  {
    path: '',
    component: ProductoCantidadComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'ProductoCantidads'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ProductoCantidadDetailComponent,
    resolve: {
      productoCantidad: ProductoCantidadResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'ProductoCantidads'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: ProductoCantidadUpdateComponent,
    resolve: {
      productoCantidad: ProductoCantidadResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'ProductoCantidads'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: ProductoCantidadUpdateComponent,
    resolve: {
      productoCantidad: ProductoCantidadResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'ProductoCantidads'
    },
    canActivate: [UserRouteAccessService]
  }
];
