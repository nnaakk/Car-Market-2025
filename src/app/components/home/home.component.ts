import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CarData } from '../../services/carinterface';
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
  constructor(private carService: CarService) { }

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



  }
}
