import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharkyComponent } from './sharky.component';

describe('SharkyComponent', () => {
  let component: SharkyComponent;
  let fixture: ComponentFixture<SharkyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharkyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SharkyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
