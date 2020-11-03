import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClienteLoginComponent } from './cliente-login/cliente-login.component';
import { ClientesComponent } from './clientes/clientes.component';
import { CuentasComponent } from './cuentas/cuentas.component';
import { GastoComponent } from './gasto/gasto.component';
import { GastosCobrosNegocioComponent } from './gastos-cobros-negocio/gastos-cobros-negocio.component';
import { HomeComponent } from './home/home.component';
import { Notificacion } from './models/Notificacion';
import { NegocioLoginComponent } from './negocio-login/negocio-login.component';
import { NotificacionesComponent } from './notificaciones/notificaciones.component';
import { PagoComponent } from './pago/pago.component';
import { PagosNegocioComponent } from './pagos-negocio/pagos-negocio.component';
import { PerfilComponent } from './perfil/perfil.component';
import { RegistrarClienteTasaComponent } from './registrar-cliente-tasa/registrar-cliente-tasa.component';
import { RegistrarClienteComponent } from './registrar-cliente/registrar-cliente.component';
import { RegistrarGastoComponent } from './registrar-gasto/registrar-gasto.component';
import { RegistrarNegocioComponent } from './registrar-negocio/registrar-negocio.component';

const routes: Routes = [{ path: 'negocio-login', component: NegocioLoginComponent },
{ path: 'cliente-login', component: ClienteLoginComponent },
{ path: 'registrar-negocio', component: RegistrarNegocioComponent },
{ path: 'clientes', component: ClientesComponent },
{ path: 'registrar-cliente', component: RegistrarClienteComponent },
{ path: 'registrar-cliente-tasa', component: RegistrarClienteTasaComponent },
{ path: 'cuentas', component: CuentasComponent },
{ path: 'pagos-cliente', component: PagoComponent },
{path:'perfil', component: PerfilComponent},
{path:'gastos-actuales', component: GastoComponent},
{path:'', component: HomeComponent},
{path:'pagos-negocio', component:PagosNegocioComponent},
{path:'gastos-cobros-negocio',component:GastosCobrosNegocioComponent},
{path:'notificaciones',component:NotificacionesComponent},
{path:'registrar-gasto-negocio',component:RegistrarGastoComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
