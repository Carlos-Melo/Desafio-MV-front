import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListParticipantesComponent } from './list-participantes.component';

describe('ListParticipantesComponent', () => {
  let component: ListParticipantesComponent;
  let fixture: ComponentFixture<ListParticipantesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListParticipantesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListParticipantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
