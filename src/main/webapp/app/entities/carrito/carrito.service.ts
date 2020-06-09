import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ICarrito } from 'app/shared/model/carrito.model';

type EntityResponseType = HttpResponse<ICarrito>;
type EntityArrayResponseType = HttpResponse<ICarrito[]>;

@Injectable({ providedIn: 'root' })
export class CarritoService {
  public resourceUrl = SERVER_API_URL + 'api/carritos';

  constructor(protected http: HttpClient) {}

  create(carrito: ICarrito): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(carrito);
    return this.http
      .post<ICarrito>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(carrito: ICarrito): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(carrito);
    return this.http
      .put<ICarrito>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<ICarrito>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ICarrito[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(carrito: ICarrito): ICarrito {
    const copy: ICarrito = Object.assign({}, carrito, {
      fecha: carrito.fecha && carrito.fecha.isValid() ? carrito.fecha.format(DATE_FORMAT) : undefined
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.fecha = res.body.fecha ? moment(res.body.fecha) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((carrito: ICarrito) => {
        carrito.fecha = carrito.fecha ? moment(carrito.fecha) : undefined;
      });
    }
    return res;
  }
}
