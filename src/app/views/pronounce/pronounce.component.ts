import { BehaviorSubject, lastValueFrom } from 'rxjs';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { DialogService } from 'src/app/services/dialog/dialog.service';
import { TextToSpeechService } from 'src/app/services/textToSpeech/text-to-speech.service';

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
    private textToSpeechService: TextToSpeechService,
  ){
    this.audio = new Audio();
  }

  public getSpeechFile(){
    this.textToSpeechService.getSpeechFile(this.textData).subscribe({
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

