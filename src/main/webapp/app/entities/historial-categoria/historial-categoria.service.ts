import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IHistorialCategoria } from 'app/shared/model/historial-categoria.model';

type EntityResponseType = HttpResponse<IHistorialCategoria>;
type EntityArrayResponseType = HttpResponse<IHistorialCategoria[]>;

@Injectable({ providedIn: 'root' })
export class HistorialCategoriaService {
  public resourceUrl = SERVER_API_URL + 'api/historial-categorias';

  constructor(protected http: HttpClient) {}

  create(historialCategoria: IHistorialCategoria): Observable<EntityResponseType> {
    return this.http.post<IHistorialCategoria>(this.resourceUrl, historialCategoria, { observe: 'response' });
  }

  update(historialCategoria: IHistorialCategoria): Observable<EntityResponseType> {
    return this.http.put<IHistorialCategoria>(this.resourceUrl, historialCategoria, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IHistorialCategoria>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IHistorialCategoria[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
