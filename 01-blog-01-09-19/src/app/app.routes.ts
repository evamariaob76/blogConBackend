
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent} from './componentes/home/home.component';
import { ComercioComponent} from './componentes/comercio/comercio.component';
import { BuscadorComponent} from './componentes/buscador/buscador.component';
import { LinkComponent} from './componentes/link/link.component';
import { MenuLateralComponent } from './componentes/menu-lateral/menu-lateral.component';
import { ActividadesComponent } from './componentes/actividades/actividades.component';
import { AutenticacionComponent } from './componentes/autenticacion/autenticacion.component';
import { ProtegidaComponent } from './componentes/protegida/protegida.component';
import { FormComponent } from './componentes/clientes/form.component';
import { ClientesComponent } from './componentes/clientes/clientes.component';
import { ComerciosLikesComponent } from './componentes/comercios-likes/comercios-likes.component';
import { UsuariosLoginComponent } from './componentes/usuarios-login/usuarios-login.component';





//import { PageNotFoundComponent } from './';
import { NgForm } from '@angular/forms';

const RUTAS: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'comercio/:id', component: ComercioComponent },
    { path: 'buscar/:nombre', component: BuscadorComponent },
    { path: 'link/:id', component: LinkComponent },
    { path: 'comercios/:nombre', component: ActividadesComponent },
    { path: 'autenticacion', component: AutenticacionComponent },
    { path: 'protegida', component: ProtegidaComponent },
    { path: 'clientes/form', component: FormComponent },
    { path: 'clientes/form/:id', component: FormComponent },
    { path: 'clientes/page/:page', component: ClientesComponent },
    { path: 'likes', component: ComerciosLikesComponent },


    { path: '**', pathMatch: 'full', redirectTo: 'home' }
];


export const APP_ROUTING = RouterModule.forRoot (RUTAS);

