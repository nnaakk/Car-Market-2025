import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { CarService } from '../../services/car.service';
import { Router } from '@angular/router';
import { CarData } from '../../interfaces/carinterface';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-cars-list',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './cars-list.component.html',
  styleUrls: ['./cars-list.component.css']
})
export class CarsListComponent implements OnInit {
  router = inject(Router);
  cars: CarData[] = [];
  filteredCars: CarData[] = [];
  userId: string = '';

  constructor(
    private authService: AuthService,
    private carService: CarService,
    private fb: FormBuilder
  ) {}

  searchForm = this.fb.group({
    brand: [''],
    yearFrom: [1950],
    yearTo: [2025],
    priceFrom: [0],
    priceTo: [100000]
  });

 ngOnInit(): void {
  this.authService.user$.subscribe(user => {
    if (user) {
      this.userId = user.uid;
      this.carService.getCars().subscribe((cars: CarData[]) => {
        this.cars = cars;
        this.filteredCars = cars;
      });
    }
  });
}


  filterCars() {
    const { brand, yearFrom, yearTo, priceFrom, priceTo } = this.searchForm.value;

    this.filteredCars = this.cars.filter(car =>
      (!brand || car.brand.toLowerCase().includes(brand.toLowerCase())) &&
      car.year >= (yearFrom ?? 1900) &&
      car.year <= (yearTo ?? new Date().getFullYear()) &&
      car.price >= (priceFrom ?? 0) &&
      car.price <= (priceTo ?? 1000000)
    );
  }

  deleteCar(carId: string) {
    const userId = this.authService.getUserId();
    if (userId) {
      this.carService.deleteCar(userId, carId).then(() => {
        this.cars = this.cars.filter(car => car.id !== carId);
        this.filteredCars = this.filteredCars.filter(car => car.id !== carId);
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
