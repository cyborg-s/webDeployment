import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Projekt1Component } from './projekt1.component';

describe('Projekt1Component', () => {
  let component: Projekt1Component;
  let fixture: ComponentFixture<Projekt1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Projekt1Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Projekt1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
