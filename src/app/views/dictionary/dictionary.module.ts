import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DictionaryComponent } from './dictionary.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { SearchDictionaryComponent } from './search-dictionary/search-dictionary.component';
import { StatusDictionaryComponent } from './status-dictionary/status-dictionary.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';



@NgModule({
  declarations: [
    DictionaryComponent,
    SearchDictionaryComponent,
    StatusDictionaryComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatCheckboxModule,
    MatTableModule,
    MatIconModule,
    MatCardModule,
    MatProgressSpinnerModule,
  ],
})
export class DictionaryModule { }
