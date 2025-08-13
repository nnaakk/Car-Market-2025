import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleMotoComponent } from './single-moto.component';

describe('SingleMotoComponent', () => {
  let component: SingleMotoComponent;
  let fixture: ComponentFixture<SingleMotoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SingleMotoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SingleMotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
