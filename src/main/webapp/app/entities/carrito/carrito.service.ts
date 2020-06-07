import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

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
    return this.http.post<ICarrito>(this.resourceUrl, carrito, { observe: 'response' });
  }

  update(carrito: ICarrito): Observable<EntityResponseType> {
    return this.http.put<ICarrito>(this.resourceUrl, carrito, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICarrito>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICarrito[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
