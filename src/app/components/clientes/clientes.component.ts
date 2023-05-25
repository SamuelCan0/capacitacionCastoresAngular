import { Component, OnInit } from '@angular/core';
import { ClienteService } from 'src/app/services/cliente.service';
import Swal from 'sweetalert2';
import { Cliente } from './cliente';


@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
})
export class ClientesComponent implements OnInit {

  clientes:Cliente[]=[];

  constructor(private cs:ClienteService) { }

  ngOnInit(): void {
   this.cs.getClientes().subscribe(
     clientes=>this.clientes = clientes
   );
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
