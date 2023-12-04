import { Injectable } from '@angular/core';
import { DialogService } from '../dialog/dialog.service';
import { Observable, Subject, lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AudioService {
  private static readonly AUDIO_TYPE = 'audio/wav';
  private mediaRecorder!: MediaRecorder;
  private chunks: Blob[] = [];

  private readonly INITIAL_TIME = "00:00";
  private stream = null;
  private recorder = null;
  private interval = null;
  private startTime = null;
  private _recorded = new Subject<RecordedAudioOutput>();
  private _recordingTime = new Subject<string>();
  private _recordingFailed = new Subject<string>();

  constructor(private dialogService: DialogService) { }

  public getRecordedBlob(): Observable<RecordedAudioOutput> {
    return this._recorded.asObservable();
  }

  public getRecordedTime(): Observable<string> {
    return this._recordingTime.asObservable();
  }

  public recordingFailed(): Observable<string> {
    return this._recordingFailed.asObservable();
  }

  public startRecording() {
    if (this.recorder) {
      return;
    }

    this._recordingTime.next(this.INITIAL_TIME);
    navigator.mediaDevices
      .getUserMedia({audio: true})
      .then(s => {
        this.stream = s;
        this.record();
      })
      .catch(err => {
        this._recordingFailed.next("Failed");
      })
  }

  private record() {
    this.recorder = new RecordRTC.StereoAudioRecorder(this.stream, {
      type: "audio",
      mimeType: "audio/webm"
    });

    this.recorder.record();
    this.startTime = moment();
    this.interval = setInterval(() => {
      const currentTime = moment();
      const diffTime = moment.duration(currentTime.diff(this.startTime));
      const time = this.toString(diffTime.minutes()) + ":" + this.toString(diffTime.seconds());
      this._recordingTime.next(time);
    }, 1000);
  }


}

interface RecordedAudioOutput {
  blob: Blob;
  title: string;
}
