import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Projekt3Component } from './projekt3.component';

describe('Projekt3Component', () => {
  let component: Projekt3Component;
  let fixture: ComponentFixture<Projekt3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Projekt3Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Projekt3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
