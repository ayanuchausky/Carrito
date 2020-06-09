import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IFechas } from 'app/shared/model/fechas.model';

type EntityResponseType = HttpResponse<IFechas>;
type EntityArrayResponseType = HttpResponse<IFechas[]>;

@Injectable({ providedIn: 'root' })
export class FechasService {
  public resourceUrl = SERVER_API_URL + 'api/fechas';

  constructor(protected http: HttpClient) {}

  create(fechas: IFechas): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(fechas);
    return this.http
      .post<IFechas>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(fechas: IFechas): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(fechas);
    return this.http
      .put<IFechas>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IFechas>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IFechas[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(fechas: IFechas): IFechas {
    const copy: IFechas = Object.assign({}, fechas, {
      fecha: fechas.fecha && fechas.fecha.isValid() ? fechas.fecha.format(DATE_FORMAT) : undefined
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
      res.body.forEach((fechas: IFechas) => {
        fechas.fecha = fechas.fecha ? moment(fechas.fecha) : undefined;
      });
    }
    return res;
  }
}
