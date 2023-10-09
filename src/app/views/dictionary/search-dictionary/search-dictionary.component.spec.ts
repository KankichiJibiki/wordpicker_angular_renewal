import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchDictionaryComponent } from './search-dictionary.component';

describe('SearchDictionaryComponent', () => {
  let component: SearchDictionaryComponent;
  let fixture: ComponentFixture<SearchDictionaryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchDictionaryComponent]
    });
    fixture = TestBed.createComponent(SearchDictionaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
