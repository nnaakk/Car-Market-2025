import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-slider',
  standalone: true,
 imports: [CommonModule, RouterLink],

  templateUrl: './slider.component.html',
  styleUrl: './slider.component.css'
})
export class SliderComponent implements OnInit {
  @Input() images: string[] = [];

  a: string = '';
  x: number = 0;
  buttonText = '>';
  buttonText1 = '<';

  ngOnInit(): void {
    if (this.images.length > 0) {
      this.a = this.images[0];
    }
  }

  onClickHandler = () => {
    if (this.x < this.images.length - 1) {
      this.x++;
      this.a = this.images[this.x];
    }
  };

  onClickHandlerBack = () => {
    if (this.x > 0) {
      this.x--;
      this.a = this.images[this.x];
    }
  };
get isNextDisabled(): boolean {
  return this.x >= this.images.length - 1;
}
get isPrevDisabled(): boolean {
  return this.x <= 0;
}
selectImage(index: number): void {
  this.x = index;
  this.a = this.images[index];
}


  onMouseOverHandler = () => this.buttonText = '> next';
  onMouseOutHandler = () => this.buttonText = '>';
  onMouseOverHandler1 = () => this.buttonText1 = '< prev';
  onMouseOutHandler1 = () => this.buttonText1 = '<';
}
