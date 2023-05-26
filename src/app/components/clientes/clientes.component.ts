import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs/operators';
import { ClienteService } from 'src/app/services/cliente.service';
import Swal from 'sweetalert2';
import { Cliente } from './cliente';


@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
})
export class ClientesComponent implements OnInit {

  clientes:Cliente[]=[];
  paginador:any;

  constructor(private cs:ClienteService,private ar:ActivatedRoute) { }

  ngOnInit(): void {
   this.ar.paramMap.subscribe(params => {
     let page:number =+ params.get('page')!;
     if (page==null) {
       page=0;
     }
     this.cs.getClientes(page)
      .pipe(
        tap((response:any)=>{
          console.log('tap 3');
          (response.content as Cliente[]).forEach(cliente=>console.log(cliente.nombre))
        })
      ).subscribe(response=>{
        this.clientes = response.content as Cliente[];
        this.paginador=response;
      });
   })
  }

  delete(cliente: Cliente): void {
    Swal.fire({
      title: '¿Estas Seguro?',
      text: `¿Seguro que deseas eliminar al cliente ${cliente.nombre} ${cliente.apellido}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar!',
      cancelButtonText: 'No, Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.cs.deleteCliente(cliente.id).subscribe(
          response=>{
            this.clientes=this.clientes.filter(cli => cli !== cliente)
            Swal.fire(
              'Cliente Eliminado!',
              `Cliente ${cliente.nombre} ${cliente.apellido} Eliminado Con Exito`,
              'success'
            )
          }
        )
      }
    })
  }

}
