import { IProducto } from 'app/shared/model/producto.model';
import { ICarrito } from 'app/shared/model/carrito.model';

export interface IProductoCantidad {
  id?: number;
  cantidad?: number;
  producto?: IProducto;
  carrito?: ICarrito;
}

export class ProductoCantidad implements IProductoCantidad {
  constructor(public id?: number, public cantidad?: number, public producto?: IProducto, public carrito?: ICarrito) {}
}
