import { ICliente } from 'app/shared/model/cliente.model';

export interface IHistorialCategoria {
  id?: number;
  mes?: number;
  seConvierteEn?: string;
  cliente?: ICliente;
}

export class HistorialCategoria implements IHistorialCategoria {
  constructor(public id?: number, public mes?: number, public seConvierteEn?: string, public cliente?: ICliente) {}
}
