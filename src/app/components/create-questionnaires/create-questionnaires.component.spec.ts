import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateQuestionnairesComponent } from './create-questionnaires.component';

describe('CreateQuestionnairesComponent', () => {
  let component: CreateQuestionnairesComponent;
  let fixture: ComponentFixture<CreateQuestionnairesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateQuestionnairesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateQuestionnairesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
