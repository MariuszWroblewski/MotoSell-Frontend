import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyOfferDetailsComponent } from './my-offer-details.component';

describe('MyOfferDetailsComponent', () => {
  let component: MyOfferDetailsComponent;
  let fixture: ComponentFixture<MyOfferDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyOfferDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyOfferDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
