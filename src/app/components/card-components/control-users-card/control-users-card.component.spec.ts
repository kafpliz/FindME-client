import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlUsersCardComponent } from './control-users-card.component';

describe('ControlUsersCardComponent', () => {
  let component: ControlUsersCardComponent;
  let fixture: ComponentFixture<ControlUsersCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ControlUsersCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ControlUsersCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
