import { Injectable } from '@angular/core';
import { DialogService } from '../dialog/dialog.service';
import { Observable, Subject, lastValueFrom } from 'rxjs';
import * as moment from 'moment';
import * as RecordRTC from 'recordrtc';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ApiUrls } from 'src/app/constants/api-urls';

@Injectable({
  providedIn: 'root'
})
export class AudioService {
  private static readonly AUDIO_TYPE = 'audio/wav';
  private mediaRecorder!: MediaRecorder;
  private chunks: Blob[] = [];

  private readonly INITIAL_TIME = "00:00";
  private stream: any;
  private recorder: any;
  private interval: any;
  private startTime: any;
  private _recorded = new Subject<RecordedAudioOutput>();
  private _recordingTime = new Subject<string>();
  private _recordingFailed = new Subject<string>();

  constructor(
    private dialogService: DialogService,
    private http: HttpClient
  ) { }

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
      mimeType: AudioService.AUDIO_TYPE
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

  public abortRecording() {
    this.stopMedia();
  }

  private toString(value: any) {
    let val = value;
    if (!value) val = "00";
    if (value < 10) val = "0" + value;
    return val;
  }

  public stopRecording() {
    if (this.recorder) {
      this.recorder.stop(
        (blob: any) => {
          if (this.startTime) {
            const mp3Name = encodeURIComponent(
              "audio_" + new Date().getTime() + ".wav"
            );
            this.stopMedia();
            this._recorded.next({ blob: blob, title: mp3Name});
          }
        },
        () => {
          this.stopMedia();
          this._recordingFailed.next("Failed");
        }
      );
    }
  }

  private stopMedia() {
    if(this.recorder) {
      this.recorder = null;
      clearInterval(this.interval);
      this.startTime = null;
      if (this.stream) {
        this.stream.getAudioTracks().forEach((track: any) => track.stop());
        this.stream = null;
      }
    }
  }
}

interface RecordedAudioOutput {
  blob: Blob;
  title: string;
}
