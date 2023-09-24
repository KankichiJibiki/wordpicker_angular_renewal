import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateWordBoxComponent } from './create-word-box.component';

describe('CreateWordBoxComponent', () => {
  let component: CreateWordBoxComponent;
  let fixture: ComponentFixture<CreateWordBoxComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateWordBoxComponent]
    });
    fixture = TestBed.createComponent(CreateWordBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
