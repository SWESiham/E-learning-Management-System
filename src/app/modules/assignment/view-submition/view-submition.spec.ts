import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSubmition } from './view-submition';

describe('ViewSubmition', () => {
  let component: ViewSubmition;
  let fixture: ComponentFixture<ViewSubmition>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewSubmition]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewSubmition);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
