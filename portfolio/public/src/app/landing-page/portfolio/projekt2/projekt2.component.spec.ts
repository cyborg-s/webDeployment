import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Projekt2Component } from './projekt2.component';

describe('Projekt2Component', () => {
  let component: Projekt2Component;
  let fixture: ComponentFixture<Projekt2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Projekt2Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Projekt2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
