import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarkFilterComponent } from './mark-filter.component';

describe('MarkFilterComponent', () => {
  let component: MarkFilterComponent;
  let fixture: ComponentFixture<MarkFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MarkFilterComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarkFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
