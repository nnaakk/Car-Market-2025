
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { MotoService } from '../../services/moto.service';
import { Router } from '@angular/router';
import { MotoData } from '../../interfaces/motointerface';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-motos-list',
  standalone: true,
  imports: [CommonModule,
    ReactiveFormsModule],
  templateUrl: './motos-list.component.html',
  styleUrl: './motos-list.component.css'
})
export class MotosListComponent {


  router = inject(Router);
 motos: MotoData[] = [];
  filteredMotos: MotoData[] = [];
  userId: string = '';

  constructor(
    private authService: AuthService,
    private motoService: MotoService,
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
      this.motoService.getMotos().subscribe((motos: MotoData[]) => {
        this.motos = motos;
        this.filteredMotos = motos;
      });
    }
  });
}


  filterMotos() {
    const { brand, yearFrom, yearTo, priceFrom, priceTo } = this.searchForm.value;

    this.filteredMotos = this.motos.filter(moto =>
      (!brand || moto.brand.toLowerCase().includes(brand.toLowerCase())) &&
      moto.year >= (yearFrom ?? 1900) &&
      moto.year <= (yearTo ?? new Date().getFullYear()) &&
      moto.price >= (priceFrom ?? 0) &&
      moto.price <= (priceTo ?? 1000000)
    );
  }

  deleteMoto(motoId: string) {
    const userId = this.authService.getUserId();
    if (userId) {
      this.motoService.deleteMoto(userId, motoId).then(() => {
        this.motos = this.motos.filter(moto => moto.id !== motoId);
        this.filteredMotos = this.filteredMotos.filter(moto => moto.id !== motoId);
      });
    }
  }

  showMoto(motoId: string) {
    const userId = this.authService.getUserId();
    if (userId) {
      this.motoService.addUserToHistoryIfNotExists(motoId, userId)
        .then(() => {
          this.router.navigateByUrl(`/list-moto/${motoId}`);
        })
        .catch(err => console.error('Error updating history:', err));
    }
  }
}
