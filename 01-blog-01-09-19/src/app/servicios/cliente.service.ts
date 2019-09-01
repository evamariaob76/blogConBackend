import { Injectable } from '@angular/core';
import { Observable, of, pipe, throwError} from 'rxjs';
import { CLIENTES } from '../../app/componentes/clientes/clientes.json';
import { Cliente } from '../componentes/clientes/cliente';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Router } from '@angular/router'; 
import { formatDate } from '@angular/common';



@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private httpHeaders = new HttpHeaders({'Conten-Type': 'aplication/json'});

  private url: string  ='http://localhost:8080/api/clientes';

  constructor( private http: HttpClient, private router: Router) { }

    private isNoAutorizado(e):boolean{
      if(e.ststu==401 || e.status==300){

        this.router.navigate(['/home'])
        return true;
      }
      return false;
    }
  getClientes(page: number): Observable<any> {
    return this.http.get(this.url + '/page/' + page).pipe(
      catchError(e=>{
          this.isNoAutorizado(e);
          return throwError(e);

      }),
      tap((response: any) => {
        console.log('ClienteService: tap 1');
        (response.content as Cliente[]).forEach(cliente => console.log(cliente.nombre));
      }),
      map((response: any) => {
        (response.content as Cliente[]).map(cliente => {
          cliente.nombre = cliente.nombre.toUpperCase();
          //let datePipe = new DatePipe('es');
          //cliente.createAt = datePipe.transform(cliente.createAt, 'EEEE dd, MMMM yyyy');
          cliente.createAt = formatDate(cliente.createAt, 'dd-MM-yyyy','en-US');
          return cliente;
        });
        return response;
      }),
      tap(response => {
        console.log('ClienteService: tap 2');
        (response.content as Cliente[]).forEach(cliente => console.log(cliente.nombre));
      })
    );
  }

   /* return this.http.get<Cliente[]>(this. url).pipe(
    map (response => response as Cliente[]); otra forma de hacerlo
*/
   
   create(cliente: Cliente): Observable<any>{
    return this.http.post<any>(this.url, cliente,{headers:this.httpHeaders}).pipe(
      catchError(e =>{
        console.error(e.error.mensaje);
        Swal.fire(  e.error.mensaje, e.error.error, 'error' );
      return throwError(e);
        })
      ); 
         //return this.http.get<Cliente>('this.url', 'this.cliente.'});
  }

    getCliente(id): Observable<Cliente>{
        return this.http.get<Cliente>(`${this.url}/${id}`).pipe(
          catchError(e => {
            if(this.isNoAutorizado(e)){
              return throwError(e);
    
            }
          this.router.navigate(['/autenticacion'])
          // console.error(e.error.mensaje);
          Swal.fire('error al editar:', e.error.mensaje, 'error')
            return throwError(e);
          })
        );
  }
  update(cliente: Cliente): Observable<any>{
    return this.http.put<any>(`${this.url}/${cliente.id}`, cliente, {headers: this.httpHeaders}).pipe(
      catchError(e =>{
        if(this.isNoAutorizado(e)){
          return throwError(e);

        }
        console.error(e.error.mensaje);
        Swal.fire(  e.error.mensaje, e.error.error, 'error' );
      return throwError(e);
        })
      ); 
  }

  delete(id: number): Observable<Cliente>{
    return this.http.delete<Cliente>(`${this.url}/${id}`, {headers:this.httpHeaders}).pipe(
      catchError(e =>{
        if(this.isNoAutorizado(e)){
          return throwError(e);

        }
        console.error(e.error.mensaje);
        Swal.fire( e.error.mensaje, e.error.error, 'error' );
      return throwError(e);
        })
      ); 



  }
}