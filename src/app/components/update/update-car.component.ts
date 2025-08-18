import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CarService } from '../../services/car.service';
import { CarData } from '../../interfaces/carinterface';

@Component({
  selector: 'app-update-car',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './update-car.component.html',
  styleUrls: ['./update-car.component.css']
})
export class UpdateComponent implements OnInit {
  carForm!: FormGroup;
  carId: string | null = null;
  isLoading: boolean = true;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private carService: CarService
  ) {}

  ngOnInit(): void {
    this.carId = this.route.snapshot.paramMap.get('carId');
    if (!this.carId) {
      this.errorMessage = 'Invalid car ID';
      return;
    }

    this.carForm = this.fb.group({
      brand: ['', Validators.required],
      typ: ['', Validators.required],
      power: ['', Validators.required],
      year: ['', [Validators.required, Validators.min(1900)]],
      description: ['', Validators.required],
      price: ['', Validators.required],
      date: [''],
      images: this.fb.array([]) 
    });

    
    this.carService.getCar(this.carId).subscribe({
      next: (car: CarData) => {
        this.carForm.patchValue({
          brand: car.brand,
          typ: car.typ,
          power: car.power,
          year: car.year,
          description: car.description,
          price: car.price,
          date: car.date
        });

        const imageArray = car.images?.map((url:string) => this.fb.control(url, Validators.required)) || [];
        this.carForm.setControl('images', this.fb.array(imageArray));

        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'Колата не е намерена.';
        this.isLoading = false;
      }
    });
  }

  get images(): FormArray {
    return this.carForm.get('images') as FormArray;
  }

  addImage(): void {
    this.images.push(this.fb.control('', Validators.required));
  }

  removeImage(index: number): void {
    this.images.removeAt(index);
  }

  updateCar(): void {
  if (this.carForm.valid && this.carId) {
    const updatedData = {
      ...this.carForm.value,
      imageUrls: this.carForm.value.images 
    };
    

    this.carService.updateCar(this.carId, updatedData)
      .then(() => this.router.navigateByUrl('/list'))
      .catch(() => this.errorMessage = 'Error while registering the car.');
  }
}

}
