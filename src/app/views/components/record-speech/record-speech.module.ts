import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecordSpeechComponent } from './record-speech.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';



@NgModule({
  declarations: [
    RecordSpeechComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule
  ],
  exports: [
    RecordSpeechComponent
  ]
})
export class RecordSpeechModule { }
