import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarkDetailsComponent } from './mark-details.component';

describe('MarkDetailsComponent', () => {
  let component: MarkDetailsComponent;
  let fixture: ComponentFixture<MarkDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MarkDetailsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarkDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
