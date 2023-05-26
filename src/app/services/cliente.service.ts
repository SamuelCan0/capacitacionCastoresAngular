import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Cliente } from '../components/clientes/cliente';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { formatDate } from '@angular/common';



@Injectable({
  providedIn: 'root'
})

export class ClienteService {
  private urlEndpoint: string='http://localhost:8001/api/clientes';

  private httpHeaders=new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient, private route:Router) {  }



  getClientes(page:number): Observable<Cliente[]> {
    return this.http.get(this.urlEndpoint+'/page/'+page).pipe(
      tap((response:any)=>{
        console.log("tap 1");
        (response.content as Cliente[]).forEach(cliente=>{
          console.log(cliente.nombre);
        })
      })
      ,
      map((response:any) => {
        (response.content as Cliente[]).map(cliente => {
          cliente.nombre=cliente.nombre.toUpperCase();
          cliente.createAt=formatDate(cliente.createAt,'EEEE dd, MMMM yyyy','es-MX');
          return cliente;
        });
        return response;
      }),
      tap((response:any)=>{
        console.log('tap 2');
        (response.content as Cliente[]).forEach(cliente=>{
          console.log(cliente.nombre);
        })
      })
    );
  }

  create(cliente:Cliente):Observable<any> {
    return this.http.post<any>(this.urlEndpoint,cliente,{headers:this.httpHeaders}).pipe(
      catchError(e=>{

        if (e.status==400) {
          return throwError(e);
        }

        console.log(e.error.error);
        Swal.fire(e.error.error,'error');
        return throwError(e);
      }));
  }

  getCliente(id: any): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.urlEndpoint}/${id}`).pipe(
      catchError(e=>{
        this.route.navigate(['/clientes']);
        console.log(e.error.mensaje);
        Swal.fire('Error al editar',e.error.mensaje,'error');
        return throwError(e);
      })
    );
  }

  updateCliente(cliente:Cliente): Observable<any> {
    return this.http.put<any>(`${this.urlEndpoint}/${cliente.id}`,cliente,{headers:this.httpHeaders}).pipe(
      catchError(e=>{

        if (e.status==400) {
          return throwError(e);
        }

        console.log(e.error.error);
        Swal.fire('Error al editar',e.error.error,'error');
        return throwError(e);
      }));
  }

  deleteCliente(id: any): Observable<Cliente> {
    return this.http.delete<Cliente>(`${this.urlEndpoint}/${id}`,{headers:this.httpHeaders}).pipe(
      catchError(e=>{
        console.log(e.error.mensaje);
        Swal.fire('Error al Eliminar',e.error.mensaje,'error');
        return throwError(e);
      }));
  }
}
