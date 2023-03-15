import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublishContentComponent } from './publish-content.component';

describe('PublishContentComponent', () => {
  let component: PublishContentComponent;
  let fixture: ComponentFixture<PublishContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublishContentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublishContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
