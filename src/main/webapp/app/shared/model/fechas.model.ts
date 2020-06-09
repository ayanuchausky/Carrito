import { Moment } from 'moment';

export interface IFechas {
  id?: number;
  fecha?: Moment;
}

export class Fechas implements IFechas {
  constructor(public id?: number, public fecha?: Moment) {}
}
