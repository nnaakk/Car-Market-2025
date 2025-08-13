import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateMotoComponent } from './update-moto.component';

describe('UpdateMotoComponent', () => {
  let component: UpdateMotoComponent;
  let fixture: ComponentFixture<UpdateMotoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateMotoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateMotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
