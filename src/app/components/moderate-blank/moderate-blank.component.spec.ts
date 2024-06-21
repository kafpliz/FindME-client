import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModerateBlankComponent } from './moderate-blank.component';

describe('ModerateBlankComponent', () => {
  let component: ModerateBlankComponent;
  let fixture: ComponentFixture<ModerateBlankComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModerateBlankComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModerateBlankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
