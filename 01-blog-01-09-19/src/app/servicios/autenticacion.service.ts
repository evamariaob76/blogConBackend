import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Usuario } from '../componentes/usuarios-login/usuario';


@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {
private _usuario : Usuario;
private  _token : string;
  constructor(private http : HttpClient) { }

    public get usuario(): Usuario{
      if(this._usuario !=null){
        return this._usuario;
      }
      else if(this._usuario ==null && sessionStorage.getItem('usuario')!=null){
     this._usuario =  JSON.parse(sessionStorage.getItem('usuario')) as Usuario;
      return this._usuario;
      }
      return new Usuario();
    }

    public get token(): string{
      if(this._token !=null){
        return this._token;
      }
      else if(this._token ==null && sessionStorage.getItem('usuario')!=null){
      this._token = sessionStorage.getItem('usuario');
      return this._token;
      }
      return null;
    }

  login(usuario: Usuario): Observable<any> {
    const urlEndpoint = 'http://localhost:8080/oauth/token';

    const credenciales = btoa('angularapp' + ':' + '12345');

    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + credenciales
    });

    let params = new URLSearchParams();
    params.set('grant_type', 'password');
    params.set('username', usuario.username);
    params.set('password', usuario.password);
    console.log(params.toString());
    return this.http.post<any>(urlEndpoint, params.toString(), { headers: httpHeaders });
  }

  guardarUsuario(accessToken : string):void{
    let datos = this.obtenerToken(accessToken);
    this._usuario= new Usuario();
    this._usuario.apellido = datos.apellidos;
    this._usuario.nombre = datos.nombre;
    this._usuario.email = datos.email;
    this._usuario.username = datos.user_name;
    this._usuario.roles = datos.authorities;
    sessionStorage.setItem('usuario',JSON.stringify(this._usuario));//convierto objeto a string

  }

  guardarToken(accessToken : string):void{
    this._token = accessToken;
    sessionStorage.setItem('token',accessToken);//convierto objeto a string

  }

  obtenerToken(accessToken : string):any{

    if(accessToken !=null){
        return   JSON.parse(atob(accessToken.split(".")[1]));
    }
   
       return null;
  }
  isAutenticated() : boolean{
    let sesion = this.obtenerToken(this.token);
    if (sesion!=null && sesion.user_name && sesion.user_name.length>0){
      return true;
    }
    return false;
  }
}
