//import { Component } from '@angular/core';
//import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { MotoService } from '../../services/moto.service';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
@Component({
  selector: 'app-create-moto',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './create-moto.component.html',
  styleUrl: './create-moto.component.css'
})
export class CreateMotoComponent {






  motoForm: FormGroup;
  router = inject(Router);

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private motoService: MotoService
  ) {
    this.motoForm = this.fb.group({
  brand: ['', Validators.required],
  typ: ['', Validators.required],
  volume: ['', Validators.required],
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
    return this.motoForm.get('images') as FormArray;
  }

  getToday(): string {
  const today = new Date();
  return today.toISOString().split('T')[0]; // YYYY-MM-DD
}

  createMoto(): void {
    if (this.motoForm.invalid) return;

    const userId = this.authService.getUserId();

    if (!userId) {
      this.router.navigateByUrl('/login');
      return;
    }

    // Тъй като ползваме imageURL, не е нужен FormData
    const motoData = {
      ...this.motoForm.value,
      userId
    };

    this.motoService.createMoto(motoData,{userId})
      .then(() => this.router.navigateByUrl('/list-moto'))
      .catch(error => console.error('Error creating:', error));
  }
}
