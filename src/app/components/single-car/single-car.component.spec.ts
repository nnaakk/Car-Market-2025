import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleCarComponent } from './single-car.component';

describe('SingleCarComponent', () => {
  let component: SingleCarComponent;
  let fixture: ComponentFixture<SingleCarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SingleCarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SingleCarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
