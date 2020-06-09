import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';

import { LoginModalService } from 'app/core/login/login-modal.service';
import { AccountService } from 'app/core/auth/account.service';
import { Account } from 'app/core/user/account.model';

import { ICarrito } from 'app/shared/model/carrito.model';
import { CarritoService } from '../entities/carrito/carrito.service';
 import { IFechas} from 'app/shared/model/fechas.model';
import { FechasService } from 'app/entities/fechas/fechas.service';
 import { ICliente } from 'app/shared/model/cliente.model';
import { ClienteService } from 'app/entities/cliente/cliente.service';
import { HttpResponse } from '@angular/common/http';
import { IProducto } from 'app/shared/model/producto.model';
import { ProductoService } from 'app/entities/producto/producto.service';
import { ProductoCantidad, IProductoCantidad } from 'app/shared/model/producto-cantidad.model';
import { JhiEventManager } from 'ng-jhipster';



@Component({
  selector: 'jhi-home',
  templateUrl: './home.component.html',
  styleUrls: ['home.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  eventSubscriber?: Subscription;
  carrito: ICarrito = {};
  mostrarTotal = false;
  productos?: IProducto[];
  historialVip?: ICliente[];
  historialComun?: ICliente[];
  usuariosVip?: ICliente[];
  account: Account | null = null;
  authSubscription?: Subscription;
  cantidad = 0;
  idProducto = 0;
  productoElegido: IProducto ={}
  isSaving= false;
  total=0;
  mesInputVip=1;
  mesInputNoVip=1;
  fechaActual: IFechas | undefined;

  constructor(private accountService: AccountService, private loginModalService: LoginModalService,
     private clienteService: ClienteService, private fechaService: FechasService,
     private productoService: ProductoService, private carritoService : CarritoService,
     protected eventManager: JhiEventManager) {}

  ngOnInit(): void {
    this.authSubscription = this.accountService.getAuthenticationState().subscribe(account => {this.account = account
      this.loadAllProductos();
      this.registerChangeInProductos();
      this.fechaService.find(1).subscribe((res: HttpResponse<IFechas>) => {
        this.fechaActual = res.body || undefined;
      })
    });
    
  }

  isAuthenticated(): boolean {
    return this.accountService.isAuthenticated();
  }

  login(): void {
    this.loginModalService.open();
  }

  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }
  loadAllProductos(): void {
    this.productoService.query().subscribe((res: HttpResponse<IProducto[]>) => {
      this.productos = res.body || [];
    });
  }
  registerChangeInProductos(): void {
    this.eventSubscriber = this.eventManager.subscribe('productoListModification', () => this.loadAllProductos());
  }
   generarCarrito(): void {
     this.carrito.total = 0;
     this.carrito.productoCants=[];
     this.clienteService.clienteLogueado().subscribe((res:HttpResponse<ICliente>) => {
       this.carrito.cliente = res.body || undefined;
     });
     this.fechaService.find(1).subscribe((res: HttpResponse<IFechas>) => {
       this.carrito.fecha = res.body!.fecha || undefined;
     });
     this.mostrarTotal = true;
   }
   eliminarCarrito(): void {
     this.mostrarTotal=false;
     this.carrito.productoCants=[];
     this.carrito={};
   }
   agregarProdCant(): void {
     this.productoService.find(this.idProducto).subscribe((res: HttpResponse<IProducto>) => {
      this.productoElegido = res.body || {};
      this.carrito.total! += (this.productoElegido.precio!*this.cantidad);
      this.carrito.productoCants!.push(
        {
          ...new ProductoCantidad(),
          cantidad: this.cantidad,
          producto: this.productoElegido
        }
       )
     });
     
   }
   guardarCarrito(): void {
     this.subscribeToSaveResponse(this.carritoService.create(this.carrito));
   }
   protected subscribeToSaveResponse(result: Observable<HttpResponse<ICarrito>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }
  sacarDelCarrito(productoCantidad: IProductoCantidad): void { 
    let i = 0;
    while (this.carrito.productoCants![i] !== productoCantidad) {
      i+=1
    }
    this.carrito.productoCants!.splice(i,1);
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  quienSeHizoVip():void {
    this.clienteService.historialVip(this.mesInputVip).subscribe((res: HttpResponse<ICliente[]>) => {
      this.historialVip = res.body || [];
    });
  }
  quienDejoDeSerVip():void{
    this.clienteService.historialComun(this.mesInputNoVip).subscribe((res: HttpResponse<ICliente[]>) => {
      this.historialComun = res.body || [];
    });
  }
  consultarVip():void {
    this.clienteService.clientesVip().subscribe((res: HttpResponse<ICliente[]>) => {
      this.usuariosVip = res.body || [];
    });
  }
}