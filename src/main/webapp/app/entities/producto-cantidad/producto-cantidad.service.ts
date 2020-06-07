import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IProductoCantidad } from 'app/shared/model/producto-cantidad.model';

type EntityResponseType = HttpResponse<IProductoCantidad>;
type EntityArrayResponseType = HttpResponse<IProductoCantidad[]>;

@Injectable({ providedIn: 'root' })
export class ProductoCantidadService {
  public resourceUrl = SERVER_API_URL + 'api/producto-cantidads';

  constructor(protected http: HttpClient) {}

  create(productoCantidad: IProductoCantidad): Observable<EntityResponseType> {
    return this.http.post<IProductoCantidad>(this.resourceUrl, productoCantidad, { observe: 'response' });
  }

  update(productoCantidad: IProductoCantidad): Observable<EntityResponseType> {
    return this.http.put<IProductoCantidad>(this.resourceUrl, productoCantidad, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IProductoCantidad>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IProductoCantidad[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
