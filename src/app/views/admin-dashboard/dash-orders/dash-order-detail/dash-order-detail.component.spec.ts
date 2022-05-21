import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashOrderDetailComponent } from './dash-order-detail.component';

describe('DashOrderDetailComponent', () => {
  let component: DashOrderDetailComponent;
  let fixture: ComponentFixture<DashOrderDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashOrderDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashOrderDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
