import { TestBed } from '@angular/core/testing';

import { TextAndSpeechService } from './text-and-speech.service';

describe('TextToSpeechService', () => {
  let service: TextAndSpeechService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TextAndSpeechService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
