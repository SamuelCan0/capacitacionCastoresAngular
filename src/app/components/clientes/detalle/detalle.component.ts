import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClienteService } from 'src/app/services/cliente.service';
import Swal from 'sweetalert2';
import { Cliente } from '../cliente';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {

  cliente!:Cliente;
  id:number = 0;

  fotoSeleccionada!:File;

  constructor(private cs:ClienteService,private ar:ActivatedRoute) { }

  ngOnInit(): void {
    this.ar.paramMap.subscribe(params => {
      this.id =+ params.get('id')!;
      if (this.id) {
        this.cs.getCliente(this.id).subscribe(cliente => {
          this.cliente=cliente;
        })
      }

    })
  }

  seleccionarFoto(event:any){
    this.fotoSeleccionada=event.target.files[0];
    console.log(this.fotoSeleccionada);
    if (this.fotoSeleccionada.type.indexOf('image')<0) {
      Swal.fire('Error Seleccionar un imagen: ',"El archivo debe ser de tipo imagen",'error');
      this.fotoSeleccionada=null!;
    }
  }

  subirFoto(){
    if (!this.fotoSeleccionada) {
      Swal.fire('Error: debes seleccionar una foto','','error');
    } else {
      this.cs.subirFoto(this.fotoSeleccionada,this.cliente.id)
      .subscribe(cliente=>{
        this.cliente=cliente;
        Swal.fire("La Foto Se a Subido Con Exito!",`se subio la foto: ${this.cliente.foto}`,"success");
      })
    }
  }
}
