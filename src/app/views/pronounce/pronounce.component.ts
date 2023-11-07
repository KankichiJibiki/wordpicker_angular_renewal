import { lastValueFrom } from 'rxjs';
import { Component } from '@angular/core';
import { DialogService } from 'src/app/services/dialog/dialog.service';
import { TextToSpeechService } from 'src/app/services/textToSpeech/text-to-speech.service';

@Component({
  selector: 'app-pronounce',
  templateUrl: './pronounce.component.html',
  styleUrls: ['./pronounce.component.css']
})
export class PronounceComponent {
  public textData: TextData = {} as TextData;
  public audioUrl: string = "";
  audio: HTMLAudioElement;

  constructor(
    private textToSpeechService: TextToSpeechService,
    private dialogService: DialogService,
  ){
    this.audio = new Audio();
  }

  ngOnChanges(): void{
    console.log(this.audioUrl);
  }

  public getSpeechFile(){
    this.textToSpeechService.getSpeechFile(this.textData).subscribe({
      next: (res: any) => {
        const binaryAudio = atob(res.data.fileContents);
        const blob = new Blob([new Uint8Array(binaryAudio.length).map((_, i) => binaryAudio.charCodeAt(i))], { type: 'audio/mpeg' });
        const audioUrl = URL.createObjectURL(blob);
        this.audioUrl = audioUrl;
        console.log(this.audioUrl);
      }
    })
  }

  public play(){
    this.audio.src = this.audioUrl;
    this.audio.load();
    this.audio.play();
  }

  public async onAudioEnded(){
    const dialogRef = this.dialogService.openYesOrNoDialog("Record ended", false);
    await lastValueFrom(dialogRef.afterClosed());
  }
}

export interface TextData{
  text: string;
}
