import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PronounceComponent } from './pronounce.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { RecordSpeechModule } from '../components/record-speech/record-speech.module';



@NgModule({
  declarations: [
    PronounceComponent,
  ],
  imports: [
    RecordSpeechModule,
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
  ]
})
export class PronounceModule { }
