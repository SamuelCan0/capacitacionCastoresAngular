import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {RouterModule,Routes} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {registerLocaleData } from '@angular/common';
import localeES from '@angular/common/locales/es-MX'

import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatNativeDateModule} from '@angular/material/core';


import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { DirectivaComponent } from './components/directiva/directiva.component';
import { ClientesComponent } from './components/clientes/clientes.component';
import { FormComponent } from './components/clientes/form.component';
import { ClienteService } from './services/cliente.service';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { DetalleComponent } from './components/clientes/detalle/detalle.component';



registerLocaleData(localeES,'es-MX')

const routes:Routes=[
  {path:'',redirectTo:'/clientes',pathMatch:'full'},
  {path: 'directiva', component: DirectivaComponent},
  {path: 'clientes', component: ClientesComponent},
  {path: 'clientes/page/:page', component: ClientesComponent},
  {path: 'clientes/form',component: FormComponent},
  {path: 'clientes/form/:id',component: FormComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DirectivaComponent,
    ClientesComponent,
    FormComponent,
    PaginatorComponent,
    DetalleComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    CommonModule,
    FormsModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatInputModule,
    MatFormFieldModule,
    MatNativeDateModule,
  ],
  providers: [ClienteService],
  bootstrap: [AppComponent]
})
export class AppModule { }
