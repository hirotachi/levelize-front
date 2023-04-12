import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TitleOffersComponent } from './title-offers.component';

describe('TitleOffersComponent', () => {
  let component: TitleOffersComponent;
  let fixture: ComponentFixture<TitleOffersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TitleOffersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TitleOffersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
