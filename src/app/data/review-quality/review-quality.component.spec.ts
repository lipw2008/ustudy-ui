import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewQualityComponent } from './review-quality.component';

describe('ReviewQualityComponent', () => {
  let component: ReviewQualityComponent;
  let fixture: ComponentFixture<ReviewQualityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewQualityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewQualityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
