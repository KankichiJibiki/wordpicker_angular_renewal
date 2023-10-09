import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusDictionaryComponent } from './status-dictionary.component';

describe('StatusDictionaryComponent', () => {
  let component: StatusDictionaryComponent;
  let fixture: ComponentFixture<StatusDictionaryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StatusDictionaryComponent]
    });
    fixture = TestBed.createComponent(StatusDictionaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
