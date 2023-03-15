import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewThingsListComponent } from './new-things-list.component';

describe('NewThingsListComponent', () => {
  let component: NewThingsListComponent;
  let fixture: ComponentFixture<NewThingsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewThingsListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewThingsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
