import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarkQualityComponent } from './mark-quality.component';

describe('MarkQualityComponent', () => {
  let component: MarkQualityComponent;
  let fixture: ComponentFixture<MarkQualityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MarkQualityComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarkQualityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
