import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewStatisticComponent } from './review-statistic.component';

describe('ReviewStatisticComponent', () => {
  let component: ReviewStatisticComponent;
  let fixture: ComponentFixture<ReviewStatisticComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewStatisticComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewStatisticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
