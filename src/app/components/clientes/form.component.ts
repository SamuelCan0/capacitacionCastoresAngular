import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Cliente } from 'src/app/models/cliente';
import { Region } from 'src/app/models/region';
import { ClienteService } from 'src/app/services/cliente.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
})
export class FormComponent implements OnInit {

  client:Cliente=new Cliente();
  title:string="Registrar Cliente";
  regiones!:Region[];

  errores:String[] = [];


  ngOnInit(){
    this.cargarCliente();
    this.cs.getRegiones().subscribe(regiones => this.regiones=regiones);
  }

  constructor(
    private cs:ClienteService,
    private router:Router,
    private ar:ActivatedRoute
  ){}


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

  compararRegion(o1:Region, o2:Region){
    return o1==null||o2==null?false:o1.id===o2.id;
  }

}
