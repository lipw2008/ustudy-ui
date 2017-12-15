import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarkSelectComponent } from './mark-select.component';

describe('MarkSelectComponent', () => {
  let component: MarkSelectComponent;
  let fixture: ComponentFixture<MarkSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MarkSelectComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarkSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
