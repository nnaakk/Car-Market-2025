import { Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LogicComponent } from './login/login.component';
import { CreateComponent } from './components/create/create.component';
import { CarsListComponent } from './components/cars-list/cars-list.component';
import { HomeComponent } from './components/home/home.component';
import { SingleCarComponent } from './components/single-car/single-car.component';
import { UpdateComponent } from './components/update/update-car.component';
import { SliderComponent } from './components/slider/slider.component';
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
    component: CreateComponent
  },
  {
    path: 'list',
    component: CarsListComponent
  },
  {
    path: `list/:carId`,
    component: SingleCarComponent
  },
  {
    path: `update/:carId`,
    component: UpdateComponent
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
