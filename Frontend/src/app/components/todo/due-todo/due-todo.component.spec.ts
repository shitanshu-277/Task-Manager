import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DueTodoComponent } from './due-todo.component';

describe('DueTodoComponent', () => {
  let component: DueTodoComponent;
  let fixture: ComponentFixture<DueTodoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DueTodoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DueTodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
