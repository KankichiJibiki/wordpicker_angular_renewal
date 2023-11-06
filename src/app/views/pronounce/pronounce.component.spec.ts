import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PronounceComponent } from './pronounce.component';

describe('PronounceComponent', () => {
  let component: PronounceComponent;
  let fixture: ComponentFixture<PronounceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PronounceComponent]
    });
    fixture = TestBed.createComponent(PronounceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
