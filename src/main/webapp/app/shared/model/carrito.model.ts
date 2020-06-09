import { Moment } from 'moment';
import { IProductoCantidad } from 'app/shared/model/producto-cantidad.model';
import { ICliente } from 'app/shared/model/cliente.model';

export interface ICarrito {
  id?: number;
  tipo?: string;
  total?: number;
  fecha?: Moment;
  productoCants?: IProductoCantidad[];
  cliente?: ICliente;
}

export class Carrito implements ICarrito {
  constructor(
    public id?: number,
    public tipo?: string,
    public total?: number,
    public fecha?: Moment,
    public productoCants?: IProductoCantidad[],
    public cliente?: ICliente
  ) {}
}
