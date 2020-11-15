import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ClienteLoginComponent } from './cliente-login/cliente-login.component';
import { NegocioLoginComponent } from './negocio-login/negocio-login.component';
import { RegistrarNegocioComponent } from './registrar-negocio/registrar-negocio.component';
import { HttpClientModule } from '@angular/common/http'
import { NegocioService } from './services/negocio.service'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClientesComponent } from './clientes/clientes.component'
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { RegistrarClienteComponent } from './registrar-cliente/registrar-cliente.component';
import { MatSelectModule } from '@angular/material/select';
import { CuentasComponent } from './cuentas/cuentas.component';
import { PagoComponent } from './pago/pago.component';
import { PerfilComponent } from './perfil/perfil.component';
import { GastoComponent } from './gasto/gasto.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { RegistrarClienteTasaComponent } from './registrar-cliente-tasa/registrar-cliente-tasa.component';
import { ClienteService } from './services/cliente.service';
import { MatNativeDateModule } from '@angular/material/core'
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { HomeComponent } from './home/home.component'
import { CookieService } from 'ngx-cookie-service';
import { PagosNegocioComponent } from './pagos-negocio/pagos-negocio.component';
import { GastosCobrosNegocioComponent } from './gastos-cobros-negocio/gastos-cobros-negocio.component';
import { RegistrarGastoComponent } from './registrar-gasto/registrar-gasto.component';
import { NotificacionesComponent } from './notificaciones-negocio/notificaciones-negocio.component';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [
    AppComponent,
    ClienteLoginComponent,
    NegocioLoginComponent,
    RegistrarNegocioComponent,
    ClientesComponent,
    RegistrarClienteComponent,
    CuentasComponent,
    PagoComponent,
    PerfilComponent,
    GastoComponent,
    RegistrarClienteTasaComponent,
    HomeComponent,
    PagosNegocioComponent,
    GastosCobrosNegocioComponent,
    RegistrarGastoComponent,
    NotificacionesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatButtonModule,
    MatSelectModule,
    MatPaginatorModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatCardModule
  ],
  providers: [NegocioService, ClienteService, CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
