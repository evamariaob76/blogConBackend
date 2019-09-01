import { Component, OnInit } from '@angular/core';
import { ComerciosService, Comercio } from '../../servicios/comercios.service';
import { Router } from '@angular/router';
import * as jQuery from 'jquery';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-menu-lateral',
  templateUrl: './menu-lateral.component.html',
  styleUrls: ['./menu-lateral.component.css']
})
export class MenuLateralComponent implements OnInit {

  comercios: any = [];
  comercio: any = [];

  constructor(private activatedRoute: ActivatedRoute,
              private comerciosService : ComerciosService,
              private router : Router) { 
  }

  ngOnInit() {


}
  
  /*verActividad(actividad:string){
    this.activatedRoute.params.subscribe(params =>{
      let nombre = params['nombre']
      if (nombre){
        this.comerciosService.findByName(nombre).subscribe((comercios => this.comercios = comercios))
      }
      })

      let cosas:any = [];
  
    for(let comercio of this.comercios){
  
      if (comercio.actividad== actividad){
        this.router.navigate(['/comercios', actividad]);

  }*/

  verActividad(nombre:string){
    this.comerciosService.findByName(nombre).subscribe( params => {

      this.router.navigate(['/comercios', nombre]), console.log(this.comerciosService);
    console.log(nombre);

  //  this.router.navigate(['/comercios', actividad]);
  })
}
}