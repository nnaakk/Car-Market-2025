import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { CarService } from '../../services/car.service';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent {
  carForm: FormGroup;
  router = inject(Router);

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private carService: CarService
  ) {
    this.carForm = this.fb.group({
  brand: ['', Validators.required],
  typ: ['', Validators.required],
  power: ['', Validators.required],
  year: ['', [Validators.required, Validators.min(1900)]],
  description: ['', Validators.required],
  price: ['', [Validators.required, Validators.min(0)]],
  phone: ['', [Validators.required, Validators.pattern(/^08[789]\d{7}$/)]],
  date: [this.getToday()],
  images: this.fb.array([
    ['', Validators.required],
    ['', Validators.required],
    ['', Validators.required],
    ['', Validators.required],
    ['', Validators.required]
  ])
});

  }

  // Улеснява достъпа до images array в HTML
  get images(): FormArray {
    return this.carForm.get('images') as FormArray;
  }

  getToday(): string {
  const today = new Date();
  return today.toISOString().split('T')[0]; // YYYY-MM-DD
}

  createCar(): void {
    if (this.carForm.invalid) return;

    const userId = this.authService.getUserId();

    if (!userId) {
      this.router.navigateByUrl('/login');
      return;
    }

    // Тъй като ползваме imageURL, не е нужен FormData
    const carData = {
      ...this.carForm.value,
      userId
    };

    this.carService.createCar(carData,{userId})
      .then(() => this.router.navigateByUrl('/list'))
      .catch(error => console.error('Error creating:', error));
  }
}
