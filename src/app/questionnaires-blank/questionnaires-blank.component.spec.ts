import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionnairesBlankComponent } from './questionnaires-blank.component';

describe('QuestionnairesBlankComponent', () => {
  let component: QuestionnairesBlankComponent;
  let fixture: ComponentFixture<QuestionnairesBlankComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuestionnairesBlankComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QuestionnairesBlankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
