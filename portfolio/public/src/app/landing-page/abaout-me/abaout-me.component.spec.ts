import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbaoutMeComponent } from './abaout-me.component';

describe('AbaoutMeComponent', () => {
  let component: AbaoutMeComponent;
  let fixture: ComponentFixture<AbaoutMeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AbaoutMeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AbaoutMeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
