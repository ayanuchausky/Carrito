import { IUser } from 'app/core/user/user.model';
import { ICarrito } from 'app/shared/model/carrito.model';

export interface ICliente {
  id?: number;
  esVip?: boolean;
  comprasUltMes?: number;
  usuario?: IUser;
  carritos?: ICarrito[];
}

export class Cliente implements ICliente {
  constructor(
    public id?: number,
    public esVip?: boolean,
    public comprasUltMes?: number,
    public usuario?: IUser,
    public carritos?: ICarrito[]
  ) {
    this.esVip = this.esVip || false;
  }
}
