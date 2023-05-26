import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ClienteService } from 'src/app/services/cliente.service';
import Swal from 'sweetalert2';
import { Cliente } from './cliente';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
})
export class FormComponent implements OnInit {


  ngOnInit(){
    this.cargarCliente()
  }

  constructor(
    private cs:ClienteService,
    private router:Router,
    private ar:ActivatedRoute
  ){}

  client:Cliente=new Cliente();
  title:string="Registrar Cliente";

  errores:String[] = [];

  cargarCliente():void {
    this.ar.params.subscribe(params => {
      let id = params['id'];
      if (id){
        this.cs.getCliente(id).subscribe(
          (cliente)=>this.client=cliente
        );
      }
    });
  }

  registrar(): void {
    this.cs.create(this.client).subscribe(
      json=>{
        this.router.navigate(["/clientes"])
        console.log(this.client)
        Swal.fire('Nuevo Cliente',`Cliente ${json.cliente.nombre} Creado con Exito`,'success')
      },
      err=>{
        this.errores=err.error.errors as string[]
        console.error('codigo de error: ' +err.error.status)
        console.log(err.error.errors);
      }
    );
  }

  update():void {
    this.cs.updateCliente(this.client).subscribe(
      json=>{
        this.router.navigate(['/clientes'])
        console.log(this.client);
        Swal.fire('Cliente Actualizado',`Cliente ${json.cliente.nombre} Actualizado con Exito`,'success')
    },
      err=>{
        this.errores=err.error.errors as string[]
        console.error('codigo de error: ' +err.error.status)
        console.log(err.error.errors);
      }
    );
  }


}
