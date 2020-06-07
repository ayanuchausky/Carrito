import { IProductoCantidad } from 'app/shared/model/producto-cantidad.model';
import { IFechas } from 'app/shared/model/fechas.model';
import { ICliente } from 'app/shared/model/cliente.model';

export interface ICarrito {
  id?: number;
  tipo?: string;
  total?: number;
  productoCants?: IProductoCantidad[];
  fecha?: IFechas;
  cliente?: ICliente;
}

export class Carrito implements ICarrito {
  constructor(
    public id?: number,
    public tipo?: string,
    public total?: number,
    public productoCants?: IProductoCantidad[],
    public fecha?: IFechas,
    public cliente?: ICliente
  ) {}
}
