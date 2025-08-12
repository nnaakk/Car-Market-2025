import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CarService } from '../../services/car.service';
import { Router } from '@angular/router';
import { SliderComponent } from '../slider/slider.component';
import { CarData } from '../../interfaces/carinterface';

@Component({
  selector: 'app-single-car',
  standalone: true,
  imports: [CommonModule, SliderComponent, RouterLink],
  templateUrl: './single-car.component.html',
  styleUrls: ['./single-car.component.css']
})
export class SingleCarComponent implements OnInit {
  userId: string = '';
  carId: string | null = null;
  car: CarData | null = null;
  selectedImage: string = '';

  router = inject(Router);

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private carService: CarService
  ) {}

  ngOnInit(): void {
    this.userId = this.authService.getUserId() || '';
    this.carId = this.route.snapshot.paramMap.get('carId');

    if (this.carId) {
      this.carService.getCar(this.carId).subscribe({
        next: (car: CarData) => {
          this.car = car;
          this.selectedImage = car.images?.[0] || '';
        },
        error: (err) => {
          console.error('Error loading car:', err);
        }
      });
    } else {
      console.error('Car ID is undefined.');
    }
  }

  editCar(): void {
    if (this.carId) {
      this.router.navigateByUrl(`/update/${this.carId}`);
    }
  }

  deleteCar(): void {
    if (this.userId && this.carId) {
      this.carService.deleteCar(this.userId, this.carId)
        .then(() => this.router.navigateByUrl('/list'))
        .catch(err => console.error('Error deleting car:', err));
    }
  }

  selectImage(img: string): void {
    this.selectedImage = img;
  }
}
