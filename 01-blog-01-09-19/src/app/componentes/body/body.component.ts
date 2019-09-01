import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { ComerciosService, Comercio } from '../../servicios/comercios.service';
import { Router, ActivatedRoute } from '@angular/router';
import * as jQuery from 'jquery';
;
import swal from 'sweetalert2';


@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit, OnChanges {
  comercios: Comercio[] = [];
  comercio : Comercio;

  
  constructor(private comerciosService: ComerciosService, 
              private router: Router, 
              private activatedRoute: ActivatedRoute
              ) {


  }

  ngOnInit() {

          this.cargarComercio();
    this.comerciosService.getComercios().subscribe(
      comercios => this.comercios = comercios

 );


  }
  ngOnChanges(){
   

    }

  verComercio(i: number){
    this.router.navigate(['/comercio', i]);
    console.log(i);

      }

  cargarComercio():void{
    this.activatedRoute.params.subscribe(params =>{
    let id = params['id']
    if (id){
      this.comerciosService.getComercio(id).subscribe((comercio => this.comercio = comercio))
    }
    })
  }
  create(): void{
    // console.log("click");
    // console.log(this.cliente);
     this.comerciosService.create(this.comercio).subscribe
       (json => {
       this.router.navigate(['/autenticacion'])
       swal.fire('Se ha guardado el comercio: ', `${json.mensaje} : ${json.comercio.nombre}`, 'success');
     
     })
   }

   update(): void{
    this.comerciosService.update(this.comercio)
    .subscribe( json => {
      this.router.navigate(['/autenticacion'])
      swal.fire('Comercio Actualizado',`${json.mensaje} : ${json.comercio.nombre}`, 'success')
})
}

addLike(id: number): void {
  this.comerciosService.addLike(id).subscribe( json => {
    swal.fire('like Actualizado', 'success')
    
})
}
}