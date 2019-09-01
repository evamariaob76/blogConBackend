import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ComerciosService, Comercio } from '../../servicios/comercios.service';


@Component({
  selector: 'app-comercio',
  templateUrl: './comercio.component.html',
  styles: []
})
export class ComercioComponent implements OnInit  {
  comercio: any = {};
  comercios: any = {};


  constructor(private activatedRoute: ActivatedRoute, 
              private comerciosService: ComerciosService,
              private router: Router) {

      this.activatedRoute.params.subscribe (params => {
      this.comercio = comerciosService.getComercio(params['id']);
      this.comercios = this.comerciosService.getComercios();

    });

  }

  comoLlegar(){
  let URL = window.location.pathname;
  console.log(URL.charAt(URL.length - 1));
  let posicion = URL.charAt(URL.length - 1);
  this.router.navigate(['/link', posicion]);

  }
  cargarComercio():void{
    this.activatedRoute.params.subscribe(params =>{
    let id = params['id']
    if (id){
      this.comerciosService.getComercio(id).subscribe((comercio => this.comercio = comercio))
    }
    })
  }
  
  Inicio(){
    this.router.navigate(['/home']);
  
    }

    ngOnInit() {
     this.cargarComercio();

}
}