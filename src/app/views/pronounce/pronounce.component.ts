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

  constructor(
    private textToSpeechService: TextToSpeechService,
    private dialogService: DialogService,
  ){}

  public getSpeechFile(){
    this.textToSpeechService.getSpeechFile(this.textData).subscribe({
      next: (res: any) => {
        this.audioUrl = res.fileContents;
      }
    })
  }

  public async onAudioEnded(){
    const dialogRef = this.dialogService.openYesOrNoDialog("Record ended", false);
    await lastValueFrom(dialogRef.afterClosed());
  }
}

export interface TextData{
  text: string;
}
