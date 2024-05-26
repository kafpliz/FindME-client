import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoRightsComponent } from './no-rights.component';

describe('NoRightsComponent', () => {
  let component: NoRightsComponent;
  let fixture: ComponentFixture<NoRightsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoRightsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NoRightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
