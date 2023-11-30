import { Injectable } from '@angular/core';
import { DialogService } from '../dialog/dialog.service';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AudioService {
  private static readonly AUDIO_TYPE = 'audio/wav';
  private mediaRecorder!: MediaRecorder;
  private chunks: Blob[] = [];
  private isRecording: boolean = false;

  constructor(private dialogService: DialogService) { }

  public startRecording() {
    this.isRecording = true;
    navigator.mediaDevices.getUserMedia({audio: true})
      .then((stream) => {
        this.mediaRecorder = new MediaRecorder(stream);

        this.mediaRecorder.ondataavailable = (event) => {
          if(event.data.size > 0) {
            this.chunks.push(event.data);
          }
        }
        this.mediaRecorder.start();
      })
      .catch(async (error) => {
        console.log(error);
        const errDialogRef = this.dialogService.openErrDialog(error.message);
        await lastValueFrom(errDialogRef.afterClosed());
        this.isRecording = false;
      })
  }

  public stopRecording(): Blob {
    if(this.mediaRecorder && this.mediaRecorder.state !== 'inactive') {
      this.mediaRecorder.stop();
      this.isRecording = false;
    }
    const audioBlob = new Blob(this.chunks, {type: AudioService.AUDIO_TYPE});
    this.chunks = [];
    return audioBlob;
  }

  public isRecordingNow(): boolean{
    return this.isRecording;
  }
}
