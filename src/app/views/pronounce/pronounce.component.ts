import { BehaviorSubject, lastValueFrom } from 'rxjs';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { TextAndSpeechService } from 'src/app/services/textAndSpeech/text-and-speech.service';
import { WordSetService } from 'src/app/services/word-set/word-set.service';

@Component({
  selector: 'app-pronounce',
  templateUrl: './pronounce.component.html',
  styleUrls: ['./pronounce.component.css']
})
export class PronounceComponent {
  static readonly TEXT_FREE_MODE = 1;
  static readonly TEXT_SAVE_MODE = 0;

  public textMode = PronounceComponent.TEXT_FREE_MODE;
  public textData: TextData = {} as TextData;
  public audioUrlSubject: BehaviorSubject<string> = new BehaviorSubject<string>("");
  audio: HTMLAudioElement;
  @ViewChild('audioPlayer') audioPlayer!: ElementRef;

  constructor(
    private textAndSpeechService: TextAndSpeechService,
    private wordService: WordSetService
  ){
    this.audio = new Audio();
  }

  public getSpeechFile() {
    this.textAndSpeechService.getSpeechFile(this.textData).subscribe({
      next: (res: any) => {
        this.audioUrlSubject.next(res.data);
        this.audioPlayer.nativeElement.load();
      }
    })
  }

  public getUsersWord() {
    
  }
}

export interface TextData{
  text: string;
}

