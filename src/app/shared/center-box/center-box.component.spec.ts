import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CenterBoxComponent } from './center-box.component';

describe('CenterBoxComponent', () => {
  let component: CenterBoxComponent;
  let fixture: ComponentFixture<CenterBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CenterBoxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CenterBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
