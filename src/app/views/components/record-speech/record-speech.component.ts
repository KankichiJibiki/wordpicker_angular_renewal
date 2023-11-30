import { BehaviorSubject } from 'rxjs';
import { TextAndSpeechService } from 'src/app/services/textAndSpeech/text-and-speech.service';
import { AudioService } from './../../../services/audio/audio.service';
import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-record-speech',
  templateUrl: './record-speech.component.html',
  styleUrls: ['./record-speech.component.css']
})
export class RecordSpeechComponent {
  private formRecordData!: Blob;
  private speechAudioData: SpeechAudioData = {} as SpeechAudioData;
  public recordedVoiceUrlSubject: BehaviorSubject<string> = new BehaviorSubject<string>("");
  public recognizedTextSubject: BehaviorSubject<string> = new BehaviorSubject<string>("");

  constructor(
    private audioService: AudioService,
    private textAndSpeechService: TextAndSpeechService
  ){}
  
  ngOnInit(): void {
  }

  // https://stackblitz.com/edit/angular-audio-recorder?file=src%2Fapp%2Fapp.component.ts
  
  public startRecording() {
    this.audioService.startRecording();
  }

  public stopRecordingAndGetRecord() {
    this.formRecordData = this.audioService.stopRecording();
    console.log(this.formRecordData);
    
    this.textAndSpeechService.getTextBySpeech(this.speechAudioData).subscribe({
      next: (res: any) => {
        this.recordedVoiceUrlSubject.next(res.data.recordedSpeechUrl);
        this.recognizedTextSubject.next(res.data.recgnizedText);
        console.log(this.recordedVoiceUrlSubject.value);
        console.log(this.recognizedTextSubject.value);
      },
      complete: () => {

      }
    })
  }

  public isRecording() {
    return this.audioService.isRecordingNow();
  }
}

export interface SpeechAudioData{
  audioFile: Blob
}

