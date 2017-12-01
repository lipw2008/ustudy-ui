import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewFilterComponent } from './review-filter.component';

describe('ReviewFilterComponent', () => {
  let component: ReviewFilterComponent;
  let fixture: ComponentFixture<ReviewFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ReviewFilterComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
