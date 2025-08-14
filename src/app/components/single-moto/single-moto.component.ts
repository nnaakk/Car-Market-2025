import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MotoService } from '../../services/moto.service';
import { Router } from '@angular/router';
import { SliderComponent } from '../slider/slider.component';
import { MotoData } from '../../interfaces/motointerface';

@Component({
  selector: 'app-single-moto',
  standalone: true,
  imports: [CommonModule, SliderComponent, RouterLink],
  templateUrl: './single-moto.component.html',
  styleUrl: './single-moto.component.css'
})
export class SingleMotoComponent implements OnInit {




  userId: string = '';
  motoId: string | null = null;
  moto: MotoData | null = null;
  selectedImage: string = '';

  router = inject(Router);

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private motoService: MotoService
  ) {}

  ngOnInit(): void {
    this.userId = this.authService.getUserId() || '';
    this.motoId = this.route.snapshot.paramMap.get('motoId');

    if (this.motoId) {
      this.motoService.getMoto(this.motoId).subscribe({
        next: (moto: MotoData) => {
          this.moto = moto;
          this.selectedImage = moto.images?.[0] || '';
        },
        error: (err) => {
          console.error('Error loading Moto:', err);
        }
      });
    } else {
      console.error('Moto ID is undefined.');
    }
  }

  editMoto(): void {
    if (this.motoId) {
      this.router.navigateByUrl(`/update-moto/${this.motoId}`);
    }
  }

  deleteMoto(): void {
    if (this.userId && this.motoId) {
      this.motoService.deleteMoto(this.userId, this.motoId)
        .then(() => this.router.navigateByUrl('/list-motos'))
        .catch(err => console.error('Error deleting moto:', err));
    }
  }

  selectImage(img: string): void {
    this.selectedImage = img;
  }
}
