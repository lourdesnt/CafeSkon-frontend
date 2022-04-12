import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InOurCafeComponent } from './in-our-cafe.component';

describe('InOurCafeComponent', () => {
  let component: InOurCafeComponent;
  let fixture: ComponentFixture<InOurCafeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InOurCafeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InOurCafeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
