import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ComerciosService } from '../../servicios/comercios.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  comercio: any = {};
  comercios: any = {};
  constructor(private activatedRoute: ActivatedRoute,
              private comerciosService : ComerciosService,
              private router : Router) { 
    this.activatedRoute.params.subscribe (params => {
      this.comercio = comerciosService.getComercio(params['id']);
      this.comercios = this.comerciosService.getComercios();

    });

  }

  ngOnInit() {
  }

  /*buscarSitios(termino: string){
   //console.log(termino);
   this.router.navigate(['/buscar',termino]);
   


  }
  */
 /*buscar(nombre : string):void{
  this.comerciosService.buscar(nombre)
  .subscribe( json => {
    this.router.navigate(['/buscador'])

})
 }*/
  Inicio(){
    this.router.navigate(['/home']);
  
    }
    Autenticarse(){
      this.router.navigate(['/clientes/form']);
    
      }
      cargarComercio():void{
        this.activatedRoute.params.subscribe(params =>{
        let id = params['id']
        if (id){
          this.comerciosService.getComercio(id).subscribe((comercio => this.comercio = comercio))
        }
        })
      }

      findByName(nombre : string ): void {
        this.comerciosService.findByName(nombre).subscribe( params => {
          this.router.navigate(['/buscar', nombre]), console.log(this.comerciosService);

          
      })
      }
}
