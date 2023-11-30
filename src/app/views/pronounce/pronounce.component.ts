import { BehaviorSubject, lastValueFrom } from 'rxjs';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { TextAndSpeechService } from 'src/app/services/textAndSpeech/text-and-speech.service';

@Component({
  selector: 'app-pronounce',
  templateUrl: './pronounce.component.html',
  styleUrls: ['./pronounce.component.css']
})
export class PronounceComponent {
  public textData: TextData = {} as TextData;
  public audioUrlSubject: BehaviorSubject<string> = new BehaviorSubject<string>("");
  audio: HTMLAudioElement;
  @ViewChild('audioPlayer') audioPlayer!: ElementRef;

  constructor(
    private textAndSpeechService: TextAndSpeechService,
  ){
    this.audio = new Audio();
  }

  public getSpeechFile(){
    this.textAndSpeechService.getSpeechFile(this.textData).subscribe({
      next: (res: any) => {
        this.audioUrlSubject.next(res.data);
        this.audioPlayer.nativeElement.load();
      }
    })
  }
}

export interface TextData{
  text: string;
}

