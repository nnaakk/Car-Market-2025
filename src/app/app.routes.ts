import { Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LogicComponent } from './login/login.component';
import { CreateComponent } from './components/create/create.component';
import { CarsListComponent } from './components/cars-list/cars-list.component';
import { HomeComponent } from './components/home/home.component';
import { SingleCarComponent } from './components/single-car/single-car.component';
import { UpdateComponent } from './components/update/update-car.component';
import { SliderComponent } from './components/slider/slider.component';
import { CreateMotoComponent } from './components/create-moto/create-moto.component';
import {MotosListComponent } from './components/motos-list/motos-list.component'
import { UpdateMotoComponent } from './components/update-moto/update-moto.component';
import { SingleMotoComponent } from './components/single-moto/single-moto.component';
import { authGuard } from './auth/auth.guard';


export const routes: Routes = [
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'login',
    component: LogicComponent,
  },
  {
    path: 'create',
    component: CreateComponent,
     canActivate:[authGuard]
  },
  {
    path: 'create-moto',
    component: CreateMotoComponent,
     canActivate:[authGuard]
  },
  {
    path: 'list',
    component: CarsListComponent,
    canActivate:[authGuard]
  },
  {
    path: 'list-motos',
    component: MotosListComponent,
    canActivate:[authGuard]
  },
  {
    path: `list/:carId`,
    component: SingleCarComponent,
    canActivate:[authGuard]
  },
    {
    path: `list-moto/:motoId`,
    component: SingleMotoComponent,
    canActivate:[authGuard]
  },
  {
    path: `update/:carId`,
    component: UpdateComponent,
    canActivate:[authGuard]
  },
  {
    path: `update-moto/:motoId`,
    component: UpdateMotoComponent,
    canActivate:[authGuard]
  },
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'slider',
    component: SliderComponent
  }
];
