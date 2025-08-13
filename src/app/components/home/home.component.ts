import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { MotoService } from '../../services/moto.service';
import { MotoData } from '../../interfaces/motointerface';
import { Router } from '@angular/router';
import { CarData } from '../../interfaces/carinterface';
import { CarService } from '../../services/car.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  authService = inject(AuthService)
  router = inject(Router);
  cars: any[] = []
  homeCars: any[] = []
  motos: any[] = []
  homeMotos: any[] = []
  constructor(private carService: CarService,private motoService: MotoService) { }

  ngOnInit(): void {


    this.authService.user$.subscribe(user => {
      if (user) {
        this.authService.currentUserSig.set({
          email: user.email!,
          username: user.displayName!,
        })
      } else {
        this.authService.currentUserSig.set(null)
      }
      console.log(this.authService.currentUserSig())
    })

  this.carService.getCars().subscribe((cars: CarData[]) => {
  this.cars = cars;
  console.log(cars[0]);
  
 this.homeCars = cars
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()) 
  .slice(0, 3);

  
});
this.motoService.getMotos().subscribe((motos: MotoData[]) => {
    this.motos = motos;
  console.log(motos[0]);
  
 this.homeMotos = motos
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()) 
  .slice(0, 3);
})



  }
}
