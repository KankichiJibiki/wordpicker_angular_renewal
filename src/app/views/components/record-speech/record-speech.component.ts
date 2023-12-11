import { BehaviorSubject } from 'rxjs';
import { TextAndSpeechService } from 'src/app/services/textAndSpeech/text-and-speech.service';
import { AudioService } from './../../../services/audio/audio.service';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-record-speech',
  templateUrl: './record-speech.component.html',
  styleUrls: ['./record-speech.component.css']
})
export class RecordSpeechComponent {
  private speechAudioData: SpeechAudioData = {} as SpeechAudioData;
  public recordedVoiceUrlSubject: BehaviorSubject<string> = new BehaviorSubject<string>("");
  public recognizedTextSubject: BehaviorSubject<string> = new BehaviorSubject<string>("");

  public isRecording = false;
  public recordedTime = "";
  public blobUrl: any;
  public teste: any;

  // Refer to this -> // https://stackblitz.com/edit/angular-audio-recorder?file=src%2Fapp%2Fapp.component.ts
  constructor(
    private audioService: AudioService,
    private sanitizer: DomSanitizer,
    private textAndSpeechService: TextAndSpeechService
  ){
    this.audioService.recordingFailed().subscribe(() => this.isRecording = false);
    this.audioService.getRecordedTime().subscribe(time => this.recordedTime = time);
    this.audioService.getRecordedBlob().subscribe(data => {
      this.teste = data;
      this.blobUrl = this.sanitizer.bypassSecurityTrustUrl(
        URL.createObjectURL(data.blob)
      )
      const textBySpeech = this.sendAudioData();
    })
  }

  public startRecording() {
    if(!this.isRecording) {
      this.isRecording = true;
      this.audioService.startRecording();
    }
  }

  public abortRecording() {
    if(this.isRecording) {
      this.isRecording = false;
      this.audioService.abortRecording();
    }
  }

  public stopRecording() {
    if(this.isRecording) {
      this.isRecording = false;
      this.audioService.stopRecording();
    }
  }

  public clearRecordedData() {
    this.blobUrl = null;
  }

  private sendAudioData() {
    console.log(this.teste);
    this.textAndSpeechService.toTextByAudioFile(this.teste.blob).subscribe({
      next: (res: any) => {
        console.log(res);
      }
    });
  }

  ngOnDestroy(): void {
    this.abortRecording();
  }
}

export interface SpeechAudioData{
  audioFile: Blob
}

