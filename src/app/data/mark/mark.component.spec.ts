import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarkDataComponent } from './mark.component';

describe('MarkDataComponent', () => {
  let component: MarkDataComponent;
  let fixture: ComponentFixture<MarkDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MarkDataComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarkDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
