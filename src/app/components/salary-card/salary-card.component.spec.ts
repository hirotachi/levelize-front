import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalaryCardComponent } from './salary-card.component';

describe('SalaryCadrdComponent', () => {
  let component: SalaryCardComponent;
  let fixture: ComponentFixture<SalaryCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SalaryCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SalaryCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
