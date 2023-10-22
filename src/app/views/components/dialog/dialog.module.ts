import { MatExpansionModule } from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { YesOrNoDialogComponent } from './yes-or-no-dialog/yes-or-no-dialog.component';
import { ErrorDialogComponent } from './error-dialog/error-dialog.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditDictionaryComponent } from './edit-dictionary/edit-dictionary.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';



@NgModule({
  declarations: [
    ErrorDialogComponent,
    YesOrNoDialogComponent,
    EditDictionaryComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatExpansionModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    MatIconModule,
    MatCheckboxModule,
  ]
})
export class DialogModule { }
