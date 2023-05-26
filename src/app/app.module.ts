import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {RouterModule,Routes} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {registerLocaleData } from '@angular/common';
import localeES from '@angular/common/locales/es-MX'



import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { DirectivaComponent } from './components/directiva/directiva.component';
import { ClientesComponent } from './components/clientes/clientes.component';
import { FormComponent } from './components/clientes/form.component';
import { ClienteService } from './services/cliente.service';
import { PaginatorComponent } from './components/paginator/paginator.component';



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
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    CommonModule,
    FormsModule,
  ],
  providers: [ClienteService],
  bootstrap: [AppComponent]
})
export class AppModule { }
