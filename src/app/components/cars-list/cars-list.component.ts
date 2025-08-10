import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { CarService } from '../../services/car.service';
import { Router } from '@angular/router';
import { CarData } from '../../services/carinterface';

@Component({
  selector: 'app-cars-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cars-list.component.html',
  styleUrl: './cars-list.component.css'
})
export class CarsListComponent {
  router = inject(Router);
  cars: CarData[] = [];
  userId: string = '';

  constructor(private authService: AuthService, private carService: CarService) {}

  ngOnInit() {
    const userId = this.authService.getUserId();
    if (userId) {
      this.userId = userId;
      this.carService.getCars().subscribe((cars: CarData[]) => {
        this.cars = cars;
      });
    }
  }

  deleteCar(carId: string) {
    const userId = this.authService.getUserId();
    if (userId) {
      this.carService.deleteCar(userId, carId).then(() => {
        this.cars = this.cars.filter(car => car.id !== carId);
      });
    }
  }

  showCar(carId: string) {
    const userId = this.authService.getUserId();
    if (userId) {
      this.carService.addUserToHistoryIfNotExists(carId, userId)
        .then(() => {
          this.router.navigateByUrl(`/list/${carId}`);
        })
        .catch(err => console.error('Error updating history:', err));
    }
  }
}
