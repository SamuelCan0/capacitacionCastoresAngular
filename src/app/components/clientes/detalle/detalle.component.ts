import { HttpEventType } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/services/cliente.service';
import { ModalService } from 'src/app/services/modal.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {

  @Input() cliente!:Cliente;
  id:number = 0;

  fotoSeleccionada!:File;
  progreso:number=0;

  constructor(private cs:ClienteService,public ms:ModalService) { }

  ngOnInit(): void {
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
      .subscribe(event=>{
        if (event.type===HttpEventType.UploadProgress) {
          this.progreso=Math.round((event.loaded/event.total!)*100);
        }else if (event.type===HttpEventType.Response){
          let response:any=event.body;
          this.cliente=response.Cliente as Cliente;
          this.ms.notificarUpload.emit(this.cliente);
          Swal.fire("La Foto Se a Subido Con Exito!",`se subio la foto: ${this.cliente.foto}`,"success");
        }
      })
    }
  }

  cerrarModal(){
    this.ms.cerrarModal();
    this.fotoSeleccionada!=null;
    this.progreso=0;
  }
}
