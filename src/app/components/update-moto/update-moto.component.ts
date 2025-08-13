import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MotoService } from '../../services/moto.service';
import { MotoData } from '../../interfaces/motointerface';

@Component({
  selector: 'app-update-moto',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './update-moto.component.html',
  styleUrl: './update-moto.component.css'
})
export class UpdateMotoComponent implements OnInit {


  motoForm!: FormGroup;
  motoId: string | null = null;
  isLoading: boolean = true;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private motoService: MotoService
  ) {}

  ngOnInit(): void {
    this.motoId = this.route.snapshot.paramMap.get('motoId');
    if (!this.motoId) {
      this.errorMessage = 'Невалиден ID на мотора.';
      return;
    }

    // Инициализация на формата
    this.motoForm = this.fb.group({
      brand: ['', Validators.required],
      typ: ['', Validators.required],
      volume: ['', Validators.required],
      year: ['', [Validators.required, Validators.min(1900)]],
      description: ['', Validators.required],
      price: ['', Validators.required],
      date: [''],
      images: this.fb.array([]) // Формата използва FormArray
    });

    // Зареждане на данни от сървиса
    this.motoService.getCar(this.motoId).subscribe({
      next: (moto: MotoData) => {
        this.motoForm.patchValue({
          brand: moto.brand,
          typ: moto.typ,
          volume: moto.volume,
          year: moto.year,
          description: moto.description,
          price: moto.price,
          date: moto.date
        });

        const imageArray = moto.images?.map((url:string) => this.fb.control(url, Validators.required)) || [];
        this.motoForm.setControl('images', this.fb.array(imageArray));

        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'Колата не е намерена.';
        this.isLoading = false;
      }
    });
  }

  get images(): FormArray {
    return this.motoForm.get('images') as FormArray;
  }

  addImage(): void {
    this.images.push(this.fb.control('', Validators.required));
  }

  removeImage(index: number): void {
    this.images.removeAt(index);
  }

  updateMoto(): void {
  if (this.motoForm.valid && this.motoId) {
    const updatedData = {
      ...this.motoForm.value,
      imageUrls: this.motoForm.value.images // копираме от формата
    };
    // Не трием images, за да не загубим информация — Firebase ще игнорира ако не го очаква

    this.motoService.updateCar(this.motoId, updatedData)
      .then(() => this.router.navigateByUrl('/list-moto'))
      .catch(() => this.errorMessage = 'Грешка при записване на мотопа.');
  }
}

}

